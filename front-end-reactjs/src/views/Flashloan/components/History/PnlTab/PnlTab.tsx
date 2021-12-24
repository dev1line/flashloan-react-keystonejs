import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Box, Flex, Heading, Text, Button, Link, OpenNewIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetCurrentEpoch, useGetHistoryFilter } from 'state/hooks'
import { Bet, BetPosition, HistoryFilter, State } from 'state/types'
import { formatBnb, getMultiplier, getPayout } from 'views/Flashloan/helpers'
import { getRoundResult, Result } from 'state/Flashloan/helpers'
import PnlChart from './PnlChart'
import SummaryRow from './SummaryRow'
import { useSelector } from 'react-redux'

interface PnlTabProps {
  hasBetHistory: boolean
  bets: Bet[]
}

interface PnlCategory {
  rounds: number
  amount: number
}

interface PnlSummary {
  won: PnlCategory & { payout: number; bestRound: { id: string; payout: number; multiplier: number } }
  lost: PnlCategory
  entered: PnlCategory
}

const TREASURY_FEE = 0.03

const getNetPayout = (bet: Bet) => {
  const rawPayout = getPayout(bet)
  const fee = rawPayout * TREASURY_FEE
  return rawPayout - fee - bet.amount
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 24px auto;
  width: 100%;
`

const initialPnlSummary: PnlSummary = {
  won: {
    rounds: 0,
    amount: 0,
    payout: 0, // net payout after all deductions
    bestRound: {
      id: '0',
      payout: 0, // net payout after all deductions
      multiplier: 0,
    },
  },
  lost: {
    rounds: 0,
    amount: 0,
  },
  entered: {
    rounds: 0,
    amount: 0,
  },
}

const getPnlSummary = (bets: Bet[], currentEpoch: number): PnlSummary => {
  return bets.reduce((summary: PnlSummary, bet) => {
    const roundResult = getRoundResult(bet, currentEpoch)
    if (roundResult === Result.WIN) {
      const payout = getNetPayout(bet)
      let { bestRound } = summary.won
      if (payout > bestRound.payout) {
        const { bullAmount, bearAmount, totalAmount } = bet.round
        const multiplier = getMultiplier(totalAmount, bet.position === BetPosition.BULL ? bullAmount : bearAmount)
        bestRound = { id: bet.round.id, payout, multiplier }
      }
      return {
        won: {
          rounds: summary.won.rounds + 1,
          amount: summary.won.amount + bet.amount,
          payout: summary.won.payout + payout,
          bestRound,
        },
        entered: {
          rounds: summary.entered.rounds + 1,
          amount: summary.entered.amount + bet.amount,
        },
        lost: summary.lost,
      }
    }
    if (roundResult === Result.LOSE) {
      return {
        lost: {
          rounds: summary.lost.rounds + 1,
          amount: summary.lost.amount + bet.amount,
        },
        entered: {
          rounds: summary.entered.rounds + 1,
          amount: summary.entered.amount + bet.amount,
        },
        won: summary.won,
      }
    }
    // Ignore Canceled and Live rounds
    return summary
  }, initialPnlSummary)
}

const PnlTab: React.FC<PnlTabProps> = ({ hasBetHistory, bets }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const histories = useSelector((state: State) => state.Flashloan.history)
  const getDataFilter = (histories, cond) => {
    switch(cond) {
      case HistoryFilter.ALL: {
        return histories;
      }
      case HistoryFilter.SUCESS: {
        return histories.filter((tx) => parseInt(tx.profit) > 0);
      }
      case HistoryFilter.FAIL: {
        return histories.filter((tx) => !(parseInt(tx.profit) > 0));
      }
    }
  }
  let caculateProfit = 0;
  const arr = histories.filter(i => parseInt(i.profit) > 0).map(i => parseInt(i.profit)).map(item => {
    caculateProfit = caculateProfit + parseInt(item);
    return item;
  })

  console.log("caculateProfit",arr)
  return true ? (
    <Box p="16px">
      <Text bold fontSize="24px" color="secondary" pb="24px">
        {t('Your history')}
      </Text>
      <Flex>
        <PnlChart lost={getDataFilter(histories, HistoryFilter.FAIL)?.length} won={getDataFilter(histories,  HistoryFilter.SUCESS)?.length} />
        <Flex flexDirection="column" justifyContent="center" pl="24px">
          <Text bold color="textSubtle">
            {t('Net results')}
          </Text>
          <Text bold fontSize="24px" lineHeight="1" color={true ? 'success' : 'failure'}>
            {`${caculateProfit > 0 ? '+' : ''}${formatBnb(caculateProfit)} BNB`}
          </Text>
          <Text small color="textSubtle">

          </Text>
        </Flex>
      </Flex>
      <Box pl="8px">
        <Text mt="24px" bold color="textSubtle">
          {t('Average return / transaction')}
        </Text>
        <Text bold color={true ? 'success' : 'failure'}>
          {`${true ? '+' : ''}${formatBnb(caculateProfit/arr.length)} BNB`}
        </Text>
        <Text small color="textSubtle">

        </Text>


          <>
            <Text mt="16px" bold color="textSubtle">
              {t('Best transaction')}
            </Text>
            <Flex alignItems="flex-end">
              <Text bold color="success">{`+${formatBnb(Math.max(...arr))} BNB`}</Text>
            </Flex>
            <Text small color="textSubtle">

            </Text>
          </>
  

        <Text mt="16px" bold color="textSubtle">
          {t('Least profit transaction')}
        </Text>
        <Text bold>{`${formatBnb(Math.min(...arr))} BNB`}</Text>
        <Text small color="textSubtle">
        
        </Text>
        <Divider />

        <Flex justifyContent="center" mt="24px">
          <Link href={`https://bscscan.com/address/${account}#internaltx`} mb="16px" external>
            <Button mt="8px" width="100%">
              {t('View Reclaimed & Won')}
              <OpenNewIcon color="white" ml="4px" />
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  ) : (
    <Box p="24px">
      <Heading size="lg" textAlign="center" mb="8px">
        {t('No transaction history available')}
      </Heading>
      <Text as="p" textAlign="center">
        {t(
          'If you are sure you should see history here, make sure you’re connected to the correct wallet and try again.',
        )}
      </Text>
    </Box>
  )
}

export default PnlTab
