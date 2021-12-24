import React from 'react'
import BigNumber from 'bignumber.js'
import { Button, useModal } from '@pancakeswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { Address, Ifo, PoolIds } from 'config/constants/types'
import { WalletIfoData, PublicIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
// import useTokenBalance from 'hooks/useTokenBalance'

import useToast from 'hooks/useToast'
import ContributeModal from './ContributeModal'
import GetLpModal from './GetLpModal'

const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

interface Props {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
}
const ContributeButton: React.FC<Props> = ({ poolId, ifo, publicIfoData, walletIfoData }) => {
  const publicPoolCharacteristics = publicIfoData[poolId]
  const userPoolCharacteristics = walletIfoData[poolId]
  const { isPendingTx, amountTokenCommittedInLP } = userPoolCharacteristics
  const { limitPerUserInLP } = publicPoolCharacteristics
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  // const userCurrencyBalance = useTokenBalance(getAddress(ifo.currency.address))

  // Refetch all the data, and display a message when fetching is done
  const handleContributeSuccess = async (amount: BigNumber) => {
    await Promise.all([publicIfoData.fetchIfoData(), walletIfoData.fetchIfoData()])
    toastSuccess(
      t('Success!'),
      t('You have contributed %amount% CAKE-BNB LP tokens to this IFO!', { amount: getBalanceNumber(amount) }),
    )
  }

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      poolId={poolId}
      ifo={ifo}
      publicIfoData={publicIfoData}
      walletIfoData={walletIfoData}
      onSuccess={handleContributeSuccess}
      userCurrencyBalance={new BigNumber(9)}
    />,
    false,
  )

  const [onPresentGetLpModal] = useModal(<GetLpModal currency={ifo.currency} />, false)

  const isDisabled =
    isPendingTx ||
    (limitPerUserInLP.isGreaterThan(0) && amountTokenCommittedInLP.isGreaterThanOrEqualTo(limitPerUserInLP))

  return (
    <Button
      onClick={new BigNumber(9).isEqualTo(0) ? onPresentGetLpModal : onPresentContributeModal}
      width="100%"
      disabled={isDisabled}
    >
      {isDisabled ? t('Max. Committed') : t('Commit LP Tokens')}
    </Button>
  )
}

export default ContributeButton
