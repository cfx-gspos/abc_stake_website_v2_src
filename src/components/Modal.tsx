import { SCAN_CONFIG } from '@/config'
import { formatAddress } from '@/utils'
import Link from 'next/link'
import { useEffect } from 'react'
import { useChainId } from 'wagmi'

type ModalType = 'success' | 'error' | 'warning'
export type ModalConfig = {
  show: boolean
  type: ModalType
  content: string
  scanHash?: string
}

interface Props {
  modalConfig: Partial<ModalConfig>
  setModal: (data: Partial<ModalConfig>) => void
}

export default function Modal({ setModal, modalConfig }: Props) {
  const chainId = useChainId()

  useEffect(() => {
    if (modalConfig.show) {
      document.body.classList.add('lock')
    } else {
      document.body.classList.remove('lock')
    }
  }, [modalConfig.show])

  return (
    <>
      {modalConfig.show ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
          <div className="bg-white p-8 relative">
            <button className="absolute top-2 right-2" onClick={() => setModal({ show: false })}>
              <i className="ri-close-line text-2xl text-stone-400"></i>
            </button>
            <div className="flex flex-col items-center gap-y-5 min-w-80">
              <div className="text-5xl">
                {modalConfig.type == 'success' ? (
                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                ) : modalConfig.type === 'error' ? (
                  <i className="ri-close-circle-fill text-red-600"></i>
                ) : (
                  <i className="ri-error-warning-fill text-orange-500"></i>
                )}
              </div>
              <div className="text-center text-gray-600">{modalConfig.content}</div>
              {modalConfig.scanHash ? (
                <Link href={SCAN_CONFIG[chainId as keyof typeof SCAN_CONFIG] + '/tx/' + modalConfig.scanHash} target="_blank" className="text-sm">
                  <span className="text-stone-700">交易Hash：</span>
                  <span className="text-newBlue">{formatAddress(modalConfig.scanHash)}</span>
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
