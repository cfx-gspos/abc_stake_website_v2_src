'use client'

import { formatAddress } from '@/utils'
import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function ConnectButton() {
  const { connect } = useConnect()
  const { address, isConnecting } = useAccount()
  return (
    <>
      {!address ? (
        <button
          disabled={isConnecting}
          className="px-3 py-1 rounded-full flex items-center border border-gray-600 text-gray-200 disabled:bg-stone-900 disabled:cursor-not-allowed"
          onClick={() => connect({ connector: injected() })}
        >
          {isConnecting ? <i className="ri-loader-2-line animate-spin mr-1"></i> : ''}
          Connect
        </button>
      ) : (
        <button className="h-8 px-3 rounded-lg bg-newBlue text-white text-sm">{formatAddress(address)}</button>
      )}
    </>
  )
}
