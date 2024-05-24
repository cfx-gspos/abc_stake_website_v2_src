import { useChainId, useReadContract, useWriteContract } from 'wagmi'
import { Address } from 'viem'
import abi from './abi/PoSPool'
import { PoSPool_Address } from './index'

export function useReadPosPool(functionName: string, args?: any) {
  const chainId = useChainId()
  return useReadContract({
    abi,
    address: PoSPool_Address[chainId as keyof typeof PoSPool_Address] as Address,
    functionName,
    args
  })
}

export function useIncreaseStake() {
  const chainId = useChainId()
  const { writeContractAsync } = useWriteContract()
  return async (amount: bigint, votePower: number) =>
    await writeContractAsync({
      abi,
      address: PoSPool_Address[chainId as keyof typeof PoSPool_Address] as Address,
      functionName: 'increaseStake',
      args: [votePower],
      value: amount
    })
}

export function useDecreaseStake() {
  const chainId = useChainId()
  const { writeContractAsync } = useWriteContract()
  return (votePower: number) =>
    writeContractAsync({
      abi,
      address: PoSPool_Address[chainId as keyof typeof PoSPool_Address] as Address,
      functionName: 'decreaseStake',
      args: [votePower]
    })
}

export function useWithdrawStake() {
  const chainId = useChainId()
  const { writeContractAsync } = useWriteContract()
  return (votePower: number) =>
    writeContractAsync({
      abi,
      address: PoSPool_Address[chainId as keyof typeof PoSPool_Address] as Address,
      functionName: 'withdrawStake',
      args: [votePower]
    })
}
