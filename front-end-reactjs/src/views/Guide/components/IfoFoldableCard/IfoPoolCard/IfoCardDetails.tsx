import React from 'react'
import { Text, Flex, Box } from '@pancakeswap/uikit'
import { PublicIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import { Ifo, PoolIds } from 'config/constants/types'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { SkeletonCardDetails } from './Skeletons'

export interface IfoCardDetailsProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
}

export interface FooterEntryProps {
  label: string
  value: string | number
}

const FooterEntry: React.FC<FooterEntryProps> = ({ label, value }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text small color="textSubtle">
        {label}
      </Text>
      <Text small textAlign="right">
        {value}
      </Text>
    </Flex>
  )
}

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ poolId, ifo, publicIfoData }) => {
  const { t } = useTranslation()
  const status = "coming_soon";
  const currencyPriceInUSD = 1
  const poolCharacteristic = 2

  /* Format start */
  const maxLpTokens = 1
  const taxRate = `${poolCharacteristic}%`

  // const totalCommittedPercent = poolCharacteristic
  //   .div(poolCharacteristic.raisingAmountPool)
  //   .times(100)
  //   .toFixed(2)
  // const totalLPCommitted = getBalanceNumber(poolCharacteristic.totalAmountPool, ifo.currency.decimals)
  const totalLPCommittedInUSD = currencyPriceInUSD
  const totalCommitted = `~$${formatNumber(totalLPCommittedInUSD)} (${1}%)`

  /* Format end */

  const renderBasedOnGuidetatus = () => {
    if (status === 'coming_soon') {
      return (
        <>
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('Max. LP token entry')} value={maxLpTokens} />}
          <FooterEntry label={t('Funds to raise:')} value={ifo[poolId].raiseAmount} />
          <FooterEntry label={t('CAKE to burn:')} value={ifo[poolId].cakeToBurn} />
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: "ABC"})}
            value={2}
          />
        </>
      )
    }
    if (status === 'live') {
      return (
        <>
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('Max. LP token entry')} value={maxLpTokens} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('Additional fee:')} value={taxRate} />}
          <FooterEntry label={t('Total committed:')} value={totalCommitted} />
        </>
      )
    }
    if (status === 'finished') {
      return (
        <>
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('Max. LP token entry')} value={maxLpTokens} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('Additional fee:')} value={taxRate} />}
          <FooterEntry label={t('Total committed:')} value={totalCommitted} />
          <FooterEntry label={t('Funds to raise:')} value={ifo[poolId].raiseAmount} />
          <FooterEntry label={t('CAKE to burn:')} value={ifo[poolId].cakeToBurn} />
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: ifo.token.symbol })}
            value={`$${ifo.tokenOfferingPrice ? ifo.tokenOfferingPrice : '?'}`}
          />
        </>
      )
    }
    return <SkeletonCardDetails />
  }

  return <Box paddingTop="24px">{renderBasedOnGuidetatus()}</Box>
}

export default IfoCardDetails
