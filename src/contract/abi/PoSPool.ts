const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'ClaimInterest',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'votePower', type: 'uint256' }
    ],
    name: 'DecreasePoSStake',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'votePower', type: 'uint256' }
    ],
    name: 'IncreasePoSStake',
    type: 'event'
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }], name: 'Initialized', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'ratio', type: 'uint256' }],
    name: 'RatioChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'votePower', type: 'uint256' }
    ],
    name: 'WithdrawStake',
    type: 'event'
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [],
    name: '_poolLockPeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_poolUnlockPeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_addr', type: 'address' },
      { internalType: 'uint64', name: 'endBlockNumber', type: 'uint64' }
    ],
    name: '_retireUserStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'offset', type: 'uint256' },
      { internalType: 'uint256', name: 'limit', type: 'uint256' },
      { internalType: 'uint64', name: 'endBlockNumber', type: 'uint64' }
    ],
    name: '_retireUserStakes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: '_userShareRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'accRewardPerCfx',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'birdgeAddrSetted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'claimAllInterest', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'claimInterest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'crossingVotes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'votePower', type: 'uint64' }],
    name: 'decreaseStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'firstUnstakeVotes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'votePower', type: 'uint256' }],
    name: 'handleCrossingVotes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'votePower', type: 'uint256' }],
    name: 'handleUnlockedIncrease',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'handleUnstakeTask',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'handleZeroVotes', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint64', name: 'votePower', type: 'uint64' }],
    name: 'increaseStake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  { inputs: [], name: 'initialize', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'poolAPY', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'poolName', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [],
    name: 'poolSummary',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'available', type: 'uint256' },
          { internalType: 'uint256', name: 'interest', type: 'uint256' },
          { internalType: 'uint256', name: 'totalInterest', type: 'uint256' }
        ],
        internalType: 'struct ESpacePoSPool.PoolSummary',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolUserShareRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'receiveInterest', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'bridgeAddress', type: 'address' }],
    name: 'setBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'count', type: 'uint256' }],
    name: 'setCfxCountOfOneVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'period', type: 'uint64' }],
    name: 'setLockPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'apy', type: 'uint256' }],
    name: 'setPoolAPY',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'setPoolName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'ratio', type: 'uint64' }],
    name: 'setPoolUserShareRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'period', type: 'uint64' }],
    name: 'setUnlockPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'i', type: 'uint256' }],
    name: 'stakerAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'stakerNumber',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'unstakeLen',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'unstakeVotes',
    outputs: [
      {
        components: [{ internalType: 'uint256', name: 'votes', type: 'uint256' }],
        internalType: 'struct UnstakeQueue.Node[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint64', name: 'offset', type: 'uint64' },
      { internalType: 'uint64', name: 'limit', type: 'uint64' }
    ],
    name: 'userInQueue',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'votePower', type: 'uint256' },
          { internalType: 'uint256', name: 'endBlock', type: 'uint256' }
        ],
        internalType: 'struct VotePowerQueue.QueueNode[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'userInQueue',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'votePower', type: 'uint256' },
          { internalType: 'uint256', name: 'endBlock', type: 'uint256' }
        ],
        internalType: 'struct VotePowerQueue.QueueNode[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'userInterest',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'userOutQueue',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'votePower', type: 'uint256' },
          { internalType: 'uint256', name: 'endBlock', type: 'uint256' }
        ],
        internalType: 'struct VotePowerQueue.QueueNode[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint64', name: 'offset', type: 'uint64' },
      { internalType: 'uint64', name: 'limit', type: 'uint64' }
    ],
    name: 'userOutQueue',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'votePower', type: 'uint256' },
          { internalType: 'uint256', name: 'endBlock', type: 'uint256' }
        ],
        internalType: 'struct VotePowerQueue.QueueNode[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'userSummary',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'votes', type: 'uint256' },
          { internalType: 'uint256', name: 'available', type: 'uint256' },
          { internalType: 'uint256', name: 'locked', type: 'uint256' },
          { internalType: 'uint256', name: 'unlocked', type: 'uint256' },
          { internalType: 'uint256', name: 'claimedInterest', type: 'uint256' },
          { internalType: 'uint256', name: 'currentInterest', type: 'uint256' }
        ],
        internalType: 'struct ESpacePoSPool.UserSummary',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'votePower', type: 'uint64' }],
    name: 'withdrawStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdrawableCfx',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
]

export default abi
