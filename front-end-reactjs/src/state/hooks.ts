import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { orderBy } from 'lodash'


import { getWeb3NoAccount } from 'utils/web3'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'

import { State, Farm, Pool, ProfileState, PriceState, FarmsState } from './types'


// import { fetchAchievements } from './achievements'


// import { getCanClaim } from './Flashloan/helpers'


// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens


export const useCakeVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalCakeInVault: totalCakeInVaultAsString,
    estimatedCakeBountyReward: estimatedCakeBountyRewardAsString,
    totalPendingCakeHarvest: totalPendingCakeHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      cakeAtLastUserAction: cakeAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.cakeVault)

  const estimatedCakeBountyReward = useMemo(() => {
    return new BigNumber(estimatedCakeBountyRewardAsString)
  }, [estimatedCakeBountyRewardAsString])

  const totalPendingCakeHarvest = useMemo(() => {
    return new BigNumber(totalPendingCakeHarvestAsString)
  }, [totalPendingCakeHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalCakeInVault = useMemo(() => {
    return new BigNumber(totalCakeInVaultAsString)
  }, [totalCakeInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const cakeAtLastUserAction = useMemo(() => {
    return new BigNumber(cakeAtLastUserActionAsString)
  }, [cakeAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalCakeInVault,
    estimatedCakeBountyReward,
    totalPendingCakeHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      cakeAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

// Profile

// export const useProfile = () => {
//   const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
//   return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
// }

// Teams


// Achievements




export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (address: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[address.toLowerCase()]
}

export const usePriceBnbBusd = (): BigNumber => {
  const bnbBusdFarm = useFarmFromPid(252)
  return bnbBusdFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdFarm.tokenPriceVsQuote) : BIG_ZERO
}

export const usePriceCakeBusd = (): BigNumber => {
  const cakeBnbFarm = useFarmFromPid(251)
  const bnbBusdPrice = usePriceBnbBusd()

  const cakeBusdPrice = cakeBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(cakeBnbFarm.tokenPriceVsQuote) : BIG_ZERO

  return cakeBusdPrice
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

// Flashloan
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.Flashloan.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.Flashloan.isChartPaneOpen)
}

export const useGetRounds = () => {
  return useSelector((state: State) => state.Flashloan.rounds)
}

export const useGetSortedRounds = () => {
  const roundData = useGetRounds()
  return orderBy(Object.values(roundData), ['epoch'], ['asc'])
}

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.Flashloan.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.Flashloan.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.Flashloan.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetRound = (id: string) => {
  const rounds = useGetRounds()
  return rounds[id]
}

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()
  return rounds.find((round) => round.epoch === currentEpoch)
}

export const useGetFlashloanStatus = () => {
  return "live";//useSelector((state: State) => state.Flashloan.status)
}

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.Flashloan.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.Flashloan.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.Flashloan.minBetAmount)
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount])
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.Flashloan.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state: State) => state.Flashloan.history)
}

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetBetByRoundId = (account: string, roundId: string) => {
  const bets = useSelector((state: State) => state.Flashloan.bets)

  if (!bets[account]) {
    return null
  }

  if (!bets[account][roundId]) {
    return null
  }

  return bets[account][roundId]
}

// export const useBetCanClaim = (account: string, roundId: string) => {
//   const bet = useGetBetByRoundId(account, roundId)

//   if (!bet) {
//     return false
//   }

//   return getCanClaim(bet)
// }

export const useGetLastOraclePrice = (): BigNumber => {
  const lastOraclePrice = useSelector((state: State) => state.Flashloan.lastOraclePrice)
  return new BigNumber(lastOraclePrice)
}

