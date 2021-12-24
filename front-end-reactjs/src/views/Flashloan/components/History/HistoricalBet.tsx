import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Box,
  ChevronDownIcon,
  ChevronUpIcon,
  Flex,
  IconButton,
  PlayCircleOutlineIcon,
  Text,
  WaitIcon,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Bet, Flashloantatus } from 'state/types'
import {  useGetCurrentEpoch, useGetFlashloanStatus } from 'state/hooks'
import { getRoundResult, Result } from 'state/Flashloan/helpers'
import { useTranslation } from 'contexts/Localization'
import { formatBnb, getPayout } from '../../helpers'
import CollectWinningsButton from '../CollectWinningsButton'
import ReclaimPositionButton from '../ReclaimPositionButton'
import BetDetails from './BetDetails'

interface BetProps {
  bet: any
}

const StyledBet = styled(Flex).attrs({ alignItems: 'center', p: '16px' })`
  background-color: ${({ theme }) => theme.card.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
`

const YourResult = styled(Box)`
  flex: 1;
  text-align: center;
`

const HistoricalBet: React.FC<BetProps> = ({ bet }) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log("BET", bet)
  const { t } = useTranslation()

  const toggleOpen = () => setIsOpen(!isOpen)

  const getRoundColor = (result) => {
    switch (result) {
      case Result.WIN:
        return 'success'
      case Result.LOSE:
        return 'failure'
      case Result.CANCELED:
        return 'textDisabled'
      default:
        return 'text'
    }
  }

  const getRoundPrefix = (result) => {
    if (result === Result.LOSE) {
      return '-'
    }

    if (result === Result.WIN) {
      return '+'
    }

    return ''
  }

  const roundResult = bet.profit > 0 ? Result.WIN: Result.LOSE;
  const resultTextColor = getRoundColor(roundResult)

  const renderBetLabel = () => {

    return (
      <>
        <Text fontSize="12px" color="textSubtle">
          {t('Your Result')}
        </Text>
        <Text bold color={resultTextColor} lineHeight={1}>
          {parseInt(bet?.profit).toFixed(2)}
        </Text>
      </>
    )
  }

  return (
    <>
      <StyledBet onClick={toggleOpen} role="button">
        <Box width="48px">
          <Text textAlign="center">
            <Text fontSize="12px" color="textSubtle">
              {t('Round')}
            </Text>
            <Text bold lineHeight={1}>
                {bet?.name}
            </Text>
          </Text>
        </Box>
        <YourResult id="flx" px="24px">{renderBetLabel()}</YourResult>
      
          <CollectWinningsButton
            hasClaimed={false}
            roundId={"2"}
            epoch={1}
            payout={100}
            scale="sm"
            mr="8px"
          >
           Share
          </CollectWinningsButton>
 
          <IconButton variant="text" scale="sm">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        
      </StyledBet>
      {isOpen && <BetDetails bet={bet} result={parseInt(bet.profit) > 0 ? Result.WIN: Result.LOSE} />}
    </>
  )
}

export default HistoricalBet
