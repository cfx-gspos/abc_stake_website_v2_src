import { useChainId, useReadContract, useWriteContract } from 'wagmi'
import { Address } from 'viem'
import abi from './abi/RewardPool'
import { RewardPool_Address } from './index'

export function useReadRewardPool(functionName: string, args?: any) {
  const chainId = useChainId()
  return useReadContract({
    abi,
    address: RewardPool_Address[chainId as keyof typeof RewardPool_Address] as Address,
    functionName,
    args
  })
}

export function useWithdrawLpReward() {
  const chainId = useChainId()
  const { writeContractAsync } = useWriteContract()
  return async () =>
    await writeContractAsync({
      abi,
      address: RewardPool_Address[chainId as keyof typeof RewardPool_Address] as Address,
      functionName: 'withdrawLpReward'
    })
}
