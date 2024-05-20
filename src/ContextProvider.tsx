'use client'

import { createConfig, http, WagmiProvider } from 'wagmi'
import { confluxESpace, confluxESpaceTestnet } from 'wagmi/chains'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets'

const chains = [confluxESpace, confluxESpaceTestnet] as const
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, injectedWallet]
    }
  ],
  {
    appName: 'ABC LP POOL',
    projectId: 'abc-lp-pool'
  }
)
export const config = createConfig({
  chains,
  connectors,
  ssr: true,
  transports: {
    [confluxESpace.id]: http('https://evm.confluxrpc.com'),
    [confluxESpaceTestnet.id]: http('https://evmtestnet.confluxrpc.com')
  }
})

const queryClient = new QueryClient()

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
