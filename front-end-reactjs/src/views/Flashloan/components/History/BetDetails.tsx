import React from 'react'
import styled from 'styled-components'
import { Bet, State } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { Flex, Text, Link, Heading, Button, OpenNewIcon, Box } from '@pancakeswap/uikit'
import { Result } from 'state/Flashloan/helpers'
import { getMultiplier } from '../../helpers'
import { PayoutRow, RoundResult } from '../RoundResult'
import { useSelector } from 'react-redux'


interface BetDetailsProps {
  bet: any
  result: Result
}

const StyledBetDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`
const Image = styled.img`
   width:20px;
   height:20px
`

const BetDetails: React.FC<BetDetailsProps> = ({ bet, result }) => {
  const { t } = useTranslation()
  // const { totalAmount, bullAmount, bearAmount } = bet.round
  const bullMultiplier = getMultiplier(1, 2)
  const bearMultiplier = getMultiplier(1, 2)
  const swiperList = useSelector((state: State) => state.Flashloan.swiperList)
  return (
    <StyledBetDetails>
      {/* {result === Result.CANCELED && (
        <Text as="p" color="failure" mb="24px">
          {t(
            'This round was automatically canceled due to an error. If you entered a position, please reclaim your funds below.',
          )}
        </Text>
      )} */}
      <Heading mb="8px">Flashloan Information</Heading>
      <RoundResult round={bet} mb="24px">
        <PayoutRow positionLabel={t('Up')} multiplier={bullMultiplier} amount={1} />
        <PayoutRow positionLabel={t('Down')} multiplier={bearMultiplier} amount={2} />
      </RoundResult>
     
      <Flex alignItems="center" justifyContent="center" mb="8px">
          <Link href={`https://kovan.etherscan.io/tx/${bet?.txhash}`} mb="16px" external>
            <Button mt="8px" width="100%">
                View Transactions More
              <OpenNewIcon color="white" ml="4px" />
            </Button>
          </Link>
      </Flex>

    </StyledBetDetails>
  )
}

export default BetDetails
