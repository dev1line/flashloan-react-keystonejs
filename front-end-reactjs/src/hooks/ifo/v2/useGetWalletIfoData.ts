import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Ifo, PoolIds } from 'config/constants/types'
// import { useERC20, useIfoV2Contract } from 'hooks/useContract'
// import { useIfoAllowance } from 'hooks/useAllowance'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'
// import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { WalletGuidetate, WalletIfoData } from '../types'

/**
 * Gets all data from an IFO related to a wallet
 */
const useGetWalletIfoData = (ifo: Ifo): WalletIfoData => {
  const { fastRefresh } = useRefresh()
  const [state, setState] = useState<WalletGuidetate>({
    poolBasic: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      taxAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
    },
    poolUnlimited: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      taxAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
    },
  })

  const { address, currency } = ifo

  const { account } = useWeb3React()
  // const contract = useIfoV2Contract(address)
  // const currencyContract = useERC20(getAddress(currency.address))
  // const allowance = useIfoAllowance(currencyContract, address)

  const setPendingTx = (status: boolean, poolId: PoolIds) =>
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        isPendingTx: status,
      },
    }))

  const setIsClaimed = (poolId: PoolIds) => {
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        hasClaimed: true,
      },
    }))
  }


  return;
}

export default useGetWalletIfoData
