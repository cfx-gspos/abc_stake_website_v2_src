'use client'

import Header from '@/components/Header'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { formatUnits, parseUnits } from 'viem'
import { useAccount, useBalance, useBlockNumber } from 'wagmi'
import { useReadPosPool, useIncreaseStake, useDecreaseStake, useWithdrawStake } from '@/contract/PoSPoolContract'
import { BASE } from '@/config'
import Modal, { ModalConfig } from '@/components/Modal'
import { formatTime, truncateTo8Decimals } from '@/utils'

type QueueItem = { votePower: bigint; endBlock: bigint }

function formatQueueTimeList(list: QueueItem[], currentBlockNumber?: bigint) {
  if (!currentBlockNumber || list.length === 0) return []
  return list.map(item => {
    const diff = (Number(item.endBlock) - Number(currentBlockNumber)) * 1000
    return {
      votePower: Number(item.votePower) * BASE,
      endBlock: Number(item.endBlock),
      // endTime: formatTime(diff > 0 ? diff + Date.now() : 0)
      endTime: formatTime(diff + Date.now())
    }
  })
}

export default function Stake() {
  const amountTip = `The amount must be an integer multiple of ${BASE}`
  const blockNumberRes = useBlockNumber()
  const { address } = useAccount()
  const [modalConfig, setModalConfig] = useState<Partial<ModalConfig>>({})
  // 账户balance
  const { data: balanceData } = useBalance({ address })
  const balance = useMemo(() => {
    if (balanceData) {
      const value = formatUnits(balanceData.value, balanceData.decimals)
      return Number(value)
    }
    return 0
  }, [balanceData])
  // stake  available数量
  const { data: userSummary } = useReadPosPool('userSummary', [address])
  const [myStakeAvailable, setMyStakeAvailable] = useState(0)
  useEffect(() => {
    if (userSummary) {
      setMyStakeAvailable(Number((userSummary as any).available) * BASE)
    } else {
      setMyStakeAvailable(0)
    }
  }, [userSummary])
  // stake  unlocked数量
  const [myStakeUnlocked, setMyStakeUnlocked] = useState(0)
  useEffect(() => {
    if (userSummary) {
      setMyStakeUnlocked(Number((userSummary as any).unlocked) * BASE)
    } else {
      setMyStakeUnlocked(0)
    }
  }, [userSummary])

  // inQueue ---- unstakeable
  const [inQueueList, setInQueueList] = useState<QueueItem[]>([])
  const { data: inQueue } = useReadPosPool('userInQueue', [address])
  useEffect(() => {
    if (inQueue) {
      setInQueueList(inQueue as QueueItem[])
    } else {
      setInQueueList([])
    }
  }, [inQueue])
  // outQueue ---- withdraw
  const { data: outQueue } = useReadPosPool('userOutQueue', [address])
  const [outQueueList, setOutQueueList] = useState<QueueItem[]>([])
  useEffect(() => {
    if (outQueue) {
      setOutQueueList(outQueue as QueueItem[])
    } else {
      setOutQueueList([])
    }
  }, [outQueue])

  // details modal
  const [detailsModalShow, setDetailsModalShow] = useState(false)
  const [detailsModalType, setDetailsModalType] = useState('')
  const detailsModalShowList =
    detailsModalType === 'inQueue'
      ? formatQueueTimeList(inQueueList, blockNumberRes.data)
      : detailsModalType === 'outQueue'
      ? formatQueueTimeList(outQueueList, blockNumberRes.data)
      : []

  // -------- stake --------
  const [loading1, setLoading1] = useState(false)
  const [amount1, setAmount1] = useState('')
  const max1 = useMemo(() => {
    return Math.floor(balance / BASE) * BASE
  }, [balance])
  const doIncrease = useIncreaseStake()
  const handleStake = async () => {
    if (Number(amount1) > max1) {
      toast.error(`The maximum available balance is ${max1}`)
      setAmount1(String(max1))
      return
    }
    const times = Number(amount1) / BASE
    if (!Number.isInteger(times) || times <= 0) {
      toast.error(amountTip)
      setAmount1('')
      return
    }
    setLoading1(true)
    try {
      const votePower = Number(amount1) / BASE
      const hash = await doIncrease(parseUnits(amount1, balanceData!.decimals), votePower)
      setLoading1(false)
      setAmount1('')
      setModalConfig({ show: true, type: 'success', content: '交易已提交，请等待确认', scanHash: hash })
    } catch (error: any) {
      console.log(error)
      toast.error(error.details)
      setLoading1(false)
    }
  }

  // -------- unstake --------
  const [loading2, setLoading2] = useState(false)
  const [amount2, setAmount2] = useState('')
  const doDecrease = useDecreaseStake()
  const handleUnstake = async () => {
    if (Number(amount2) > myStakeAvailable) {
      toast.error(`The maximum available amount is ${myStakeAvailable}`)
      setAmount2(String(myStakeAvailable))
      return
    }
    const times = Number(amount2) / BASE
    if (!Number.isInteger(times) || times <= 0) {
      toast.error(amountTip)
      setAmount2('')
      return
    }
    setLoading2(true)
    try {
      const votePower = Number(amount2) / BASE
      const hash = await doDecrease(votePower)
      setLoading2(false)
      setAmount2('')
      setModalConfig({ show: true, type: 'success', content: '交易已提交，请等待确认', scanHash: hash })
    } catch (error: any) {
      console.log(error)
      toast.error(error.details)
      setLoading2(false)
    }
  }

  // -------- withdraw --------
  const [loading3, setLoading3] = useState(false)
  const [amount3, setAmount3] = useState('')
  const doWithdraw = useWithdrawStake()
  const handleWithdraw = async () => {
    if (Number(amount3) > myStakeUnlocked) {
      toast.error(`The maximum available amount is ${myStakeUnlocked}`)
      setAmount2(String(myStakeUnlocked))
      return
    }
    const times = Number(amount3) / BASE
    if (!Number.isInteger(times) || times <= 0) {
      toast.error(amountTip)
      setAmount3('')
      return
    }
    setLoading3(true)
    try {
      const votePower = Number(amount3) / BASE
      const hash = await doWithdraw(votePower)
      setLoading3(false)
      setModalConfig({ show: true, type: 'success', content: '交易已提交，请等待确认', scanHash: hash })
    } catch (error: any) {
      console.log(error)
      toast.error(error.details)
      setLoading3(false)
    }
  }

  // 设置 max
  const handleSetMax = (type: number) => {
    if (type === 1) {
      setAmount1(String(max1))
    }
    if (type === 2) {
      setAmount2(String(myStakeAvailable))
    }
    if (type === 3) {
      setAmount3(String(myStakeUnlocked))
    }
  }

  // details
  const onClickDetails = (type: string) => {
    setDetailsModalShow(true)
    setDetailsModalType(type)
  }

  useEffect(() => {
    if (detailsModalShow) {
      document.body.classList.add('lock')
    } else {
      document.body.classList.remove('lock')
    }
  }, [detailsModalShow])

  return (
    <div className="pb-5">
      <Header></Header>
      <h2 className="slogan">ABC Pool V2</h2>
      <div className="mx-auto px-5 grid gap-y-5 md:max-w-5xl md:grid-cols-2 md:gap-x-6">
        <div>
          <h2 className="text-sky-400 text-2xl">Stake CFX</h2>
          <div className="layout">
            <div className="layout-row">
              <div>Balance</div>
              <div className="text-newBlue">{truncateTo8Decimals(balance, 5)} CFX</div>
            </div>
            <div>
              <div className="layout-row">
                <div>Amount</div>
                <input
                  value={amount1}
                  type="number"
                  min={BASE}
                  step={BASE}
                  placeholder="Please enter"
                  className="w-full mx-4 text-right text-sm text-newBlue bg-transparent outline-none"
                  onChange={e => setAmount1(e.target.value)}
                />
                <button className="text-newBlue" onClick={() => handleSetMax(1)}>
                  Max
                </button>
              </div>
              <div className="text-xs text-red-500 text-right mt-1">{amountTip}</div>
            </div>
          </div>
          <button
            disabled={loading1}
            className="w-full bg-newBlue text-white px-2 h-9 mt-5 rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-65"
            onClick={handleStake}
          >
            {loading1 ? <i className="ri-loader-2-fill animate-spin mr-1"></i> : ''}
            Stake
          </button>
        </div>
        <div>
          <div className="flex justify-between items-center text-yellow-600">
            <h2 className="text-2xl">Unstakeable CFX</h2>
            <button className="border border-yellow-700 px-2 rounded" onClick={() => onClickDetails('inQueue')}>
              Details
            </button>
          </div>
          <div className="layout">
            <div className="layout-row">
              <div>Unstakeable</div>
              <div className="text-newBlue">{myStakeAvailable} CFX</div>
            </div>
            <div>
              <div className="layout-row">
                <div>Amount</div>
                <input
                  value={amount2}
                  type="number"
                  min={BASE}
                  step={BASE}
                  placeholder="Please enter"
                  className="w-full mx-4 text-right text-sm text-yellow-600 bg-transparent outline-none"
                  onChange={e => setAmount2(e.target.value)}
                />
                <button className="text-newBlue" onClick={() => handleSetMax(2)}>
                  Max
                </button>
              </div>
              <div className="text-xs text-red-500 text-right mt-1">{amountTip}</div>
            </div>
          </div>
          <button
            disabled={loading2}
            className="w-full bg-yellow-600 text-white px-2 h-10 mt-5 rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-65"
            onClick={handleUnstake}
          >
            {loading2 ? <i className="ri-loader-2-fill animate-spin mr-1"></i> : ''}
            Unstake
          </button>
        </div>
        <div>
          <div className="flex justify-between items-center text-green-600">
            <h2 className="text-2xl">Withdraw CFX</h2>
            <button className="border border-green-700 px-2 rounded" onClick={() => onClickDetails('outQueue')}>
              Details
            </button>
          </div>
          <div className="layout">
            <div className="layout-row">
              <div>Withdrawable</div>
              <div className="text-newBlue">{myStakeUnlocked} CFX</div>
            </div>
            <div>
              <div className="layout-row">
                <div>Amount</div>
                <input
                  value={amount3}
                  type="number"
                  min={BASE}
                  step={BASE}
                  placeholder="Please enter"
                  className="w-full mx-4 text-right text-sm text-green-600 bg-transparent outline-none"
                  onChange={e => setAmount3(e.target.value)}
                />
                <button className="text-newBlue" onClick={() => handleSetMax(3)}>
                  Max
                </button>
              </div>
              <div className="text-xs text-red-500 text-right mt-1">{amountTip}</div>
            </div>
          </div>
          <button
            disabled={loading3}
            className="w-full bg-green-600 text-white px-2 h-10 mt-5 rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-65"
            onClick={handleWithdraw}
          >
            {loading3 ? <i className="ri-loader-2-fill animate-spin mr-1"></i> : ''}
            Withdraw
          </button>
        </div>
      </div>
      <div className="mx-auto mt-6 mb-10 px-5 md:max-w-5xl">
        <h2 className="text-stone-200 text-xl">Stake Rules</h2>
        <div className="text-slate-400 leading-6 mt-2">
          <p>1. The lock period of Stake/Unstake is 15+2 day(May need another 2~3 hours).</p>
          <p>2. The reward will updated every hour.</p>
          <p>3. The Stake/Unstake CFX amount must be multiple of 1000.</p>
          <p>4. Performance fee is 8% of the PoS reward.</p>
          <p>5. The reward can be claimed any time.</p>
        </div>
      </div>

      <Modal setModal={(data: Partial<ModalConfig>) => setModalConfig(data)} modalConfig={modalConfig} />

      {detailsModalShow ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
          <div className="bg-gradient-to-tl from-green-900 to-yellow-300 w-full mx-3 px-3 py-8 md:p-8 rounded-xl relative md:w-4/5 max-w-2xl">
            <button className="absolute top-2 right-2" onClick={() => setDetailsModalShow(false)}>
              <i className="ri-close-line text-2xl text-white"></i>
            </button>
            <div className="text-xl font-bold text-center md:text-left">
              {detailsModalType === 'inQueue' ? 'Locking' : detailsModalType === 'outQueue' ? 'Unlocking' : ''} votes
            </div>
            <div className="mt-5 text-white border-b border-gray-200/60 text-sm md:text-base">
              <div className="grid grid-cols-[130px_1fr] md:grid-cols-2 border-t border-l border-gray-200/60">
                <div className="px-4 py-2 border-r border-gray-200/60">Amount (CFX)</div>
                <div className="px-4 py-2 border-r border-gray-200/60">EndTime</div>
              </div>
              <div className="max-h-96 md:max-h-[600px] overflow-y-auto thin-scrollbar">
                {detailsModalShowList.map(item => (
                  <div key={item.endBlock} className="grid grid-cols-[130px_1fr] md:grid-cols-2 border-t border-l border-gray-200/60">
                    <div className="px-4 py-2 border-r border-gray-200/60 h-full">{item.votePower}</div>
                    <div className="px-4 py-2 border-r border-gray-200/60">{item.endTime}</div>
                  </div>
                ))}
                {detailsModalShowList.length === 0 ? <div className="text-center py-3 border border-b-0 border-gray-200/60">No data</div> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
