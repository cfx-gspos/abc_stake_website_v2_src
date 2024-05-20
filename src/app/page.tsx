'use client'

import Header from '@/components/Header'
import { BASE } from '@/config'
import { useReadPosPool } from '@/contract/PoSPoolContract'
import { useReadRewardPool, useWithdrawLpReward } from '@/contract/RewardPoolContract'
import { formatNumberByComma, truncateTo8Decimals } from '@/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import { formatUnits } from 'viem'
import Modal, { ModalConfig } from '@/components/Modal'

export default function Home() {
  const [modalConfig, setModalConfig] = useState<Partial<ModalConfig>>({})

  const { address } = useAccount()
  const [myStake, setMyStake] = useState('')
  const { data: userSummary } = useReadPosPool('userSummary', [address])
  useEffect(() => {
    if (userSummary) {
      setMyStake(formatNumberByComma(Number((userSummary as any).available.toString()) * BASE))
    } else {
      setMyStake('0')
    }
  }, [userSummary])

  const [totalStake, setTotalStake] = useState('')
  const { data: poolSummary } = useReadPosPool('poolSummary')
  useEffect(() => {
    if (poolSummary) {
      setTotalStake(formatNumberByComma(Number((poolSummary as any).available.toString()) * BASE))
    } else {
      setTotalStake('0')
    }
  }, [poolSummary])

  const [totalRewardLp, setTotalRewardLp] = useState('')
  const { data: totalReward } = useReadRewardPool('totalReward')
  useEffect(() => {
    if (typeof totalReward !== 'undefined') {
      const total = formatUnits(totalReward as bigint, 18)
      setTotalRewardLp(truncateTo8Decimals(total))
    } else {
      setTotalRewardLp('0')
    }
  }, [totalReward])

  const [myLp, setMyLp] = useState('')
  const { data: userLp } = useReadRewardPool('getLpBalance', [address])
  useEffect(() => {
    if (typeof userLp !== 'undefined') {
      const lp = formatUnits(userLp as bigint, 18)
      setMyLp(truncateTo8Decimals(lp))
    } else {
      setMyLp('0')
    }
  }, [userLp])

  const [blockNum, setBlockNum] = useState(0)
  const { data: blockNumber } = useReadRewardPool('getLastBlockNum')
  useEffect(() => {
    if (typeof blockNumber !== 'undefined') {
      setBlockNum(Number(blockNumber))
    } else {
      setBlockNum(0)
    }
  }, [blockNumber])

  const [myReward, setMyReward] = useState('')
  const { data: accountReward } = useReadRewardPool('getAccountReward', [address])
  useEffect(() => {
    if (typeof accountReward !== 'undefined') {
      const reward = formatUnits(accountReward as bigint, 18)
      setMyReward(truncateTo8Decimals(reward))
    } else {
      setMyReward('0')
    }
  }, [accountReward])

  const [loading, setLoading] = useState(false)
  const doClaim = useWithdrawLpReward()
  const handleClaim = async () => {
    if (Number(myReward) <= 0) {
      toast.error('你的ABC LP为0，不能领取')
      return
    }
    setLoading(true)
    try {
      const tx = await doClaim()
      setLoading(false)
      setModalConfig({ show: true, type: 'success', content: '交易已提交，请等待确认', scanHash: tx })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        toast.success('Copy successfully.')
      },
      () => {
        toast.success('Copy failed.')
      }
    )
  }

  return (
    <div className="pb-6">
      <Header></Header>
      <h2 className="slogan">ABC Pool V2</h2>
      <div className="mx-auto px-5 grid gap-y-5 md:max-w-5xl md:grid-cols-2 md:gap-x-6">
        <div>
          <h2 className="text-stone-200 text-2xl">Dashboard</h2>
          <div className="layout md:min-h-72">
            <div className="layout-row">
              <div>Total Stake(CFX)</div>
              <div className="text-newBlue">{totalStake || 0}</div>
            </div>
            <div className="layout-row">
              <div>My Stake(CFX)</div>
              <div className="text-newBlue">{myStake || 0}</div>
            </div>
            <div className="layout-row">
              <div>Total Reward(LP)</div>
              <div className="text-newBlue">{totalRewardLp || 0}</div>
            </div>
            <div className="layout-row">
              <div>APY(Estimate)</div>
              <div className="text-newBlue">&gt;20%</div>
            </div>
            <div className="layout-row">
              <div>Go to Stake/Withdraw</div>
              <Link href="/stake">
                <button className="bg-newBlue text-white px-2 h-6 rounded">Go</button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-stone-200 text-2xl">Active Reward</h2>
          <div className="layout md:min-h-72">
            <div className="layout-row">
              <div>My CFX-ABC LP</div>
              <div className="text-newBlue">{myLp || 0}</div>
            </div>
            <div className="layout-row">
              <div>Last BlockNum</div>
              <div className="text-red-700">{blockNum}</div>
            </div>
            <div className="layout-row">
              <div>
                <div>My reward</div>
                <div className="text-newBlue">{myReward || 0} ABC LP</div>
              </div>
              <button
                disabled={loading}
                className="bg-newBlue text-white px-2 h-6 rounded flex items-center disabled:cursor-not-allowed disabled:opacity-65"
                onClick={handleClaim}
              >
                {loading ? <i className="ri-loader-2-fill animate-spin mr-2"></i> : ''}
                Claim
              </button>
            </div>
            <div className="layout-row">
              <div className="flex-1">
                <div className="layout-row">
                  <div>Go to stake LP</div>
                  <Link href="https://app.swappi.io/#/farming" target="_blank" className="bg-newBlue text-white px-2 h-6 rounded">
                    <span>Stake</span>
                    <i className="ri-arrow-right-up-line"></i>
                  </Link>
                </div>
                <div className="text-red-600 text-xs mt-1">The acquired LP can be directly pledged in swappi to obtain other benefits.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 mb-10 px-5 md:max-w-5xl">
        <h2 className="text-stone-200 text-xl">Rules</h2>
        <div className="text-slate-400 leading-6 mt-2">
          <p>
            1. Every hour, according to the mortgage amount of the specified block snapshot address, user income is automatically converted into LP and added to
            the pool as a reward.
          </p>
          <p>2. Users can view current rewards, and unclaimed rewards will be accumulated automatically.</p>
          <p>3. The acquired LP can be directly pledged in swappi to obtain other benefits.</p>
          <p>4. Regular snapshots of LP, we will regularly issue CFX as rewards.</p>
        </div>
      </div>
      <footer>
        <div className="px-5 py-3 flex justify-center text-white text-center">
          <Link href="https://twitter.com/@ABCpospool" target="_blank" className="w-16 hover:text-newBlue">
            <i className="ri-twitter-x-fill text-2xl"></i>
          </Link>
          <Link href="https://t.me/abcpoolchinese" target="_blank" className="w-16 hover:text-newBlue">
            <i className="ri-telegram-fill text-2xl"></i>
          </Link>
          <Link href="https://t.me/abcdaohome" target="_blank" className="w-16 hover:text-newBlue">
            <i className="ri-telegram-fill text-2xl"></i>
          </Link>
          <div className="flex flex-col cursor-pointer w-16 hover:text-newBlue" title="QQ" onClick={() => handleCopy('954815715')}>
            <i className="ri-qq-fill text-2xl"></i>
          </div>
          <div className="flex flex-col cursor-pointer w-16 hover:text-newBlue" title="WeChat" onClick={() => handleCopy('DP494935329')}>
            <i className="ri-wechat-fill text-2xl"></i>
          </div>
        </div>
        <div className="text-center text-stone-400">©2024 ABCPool</div>
      </footer>

      <Modal setModal={(data: Partial<ModalConfig>) => setModalConfig(data)} modalConfig={modalConfig} />
    </div>
  )
}
