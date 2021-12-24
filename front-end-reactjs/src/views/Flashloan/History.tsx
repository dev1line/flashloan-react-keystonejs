import React, { useEffect, useState } from 'react'
import { Flex, Spinner, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { getUnclaimedWinningBets } from 'state/Flashloan/helpers'
import { HistoryFilter } from 'state/types'
import { useAppDispatch } from 'state'
import {
  useGetCurrentEpoch,
  useGetHistoryByAccount,
  useGetHistoryFilter,
  // useGetIsFetchingHistory,
  useIsHistoryPaneOpen,
} from 'state/hooks'
import { Header, HistoryTabs } from './components/History'
import RoundsTab from './components/History/RoundsTab'
import PnlTab from './components/History/PnlTab/PnlTab'

import { Button, useModal } from '@pancakeswap/uikit'
import CollectRoundWinningsModal from './components/CollectRoundWinningsModal'
import { useQuery } from '@apollo/client'
import { ALL_HISTORY } from 'query/general'
import { setHistory } from 'state/Flashloan'

const StyledHistory = styled.div`
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  flex-direction: column;
  height: 100%;
`

const BetWrapper = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  position: relative;
`

const SpinnerWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  left: 0;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`

const History = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(HistoryTabs.TRANSACTIONS)
  const {
    loading: fetching,  
    error,
    data: historyData = {},
    refetch,
  } = useQuery(ALL_HISTORY, {
    variables: {
        sender: account
    }
  });
  console.log("historyData", historyData?.histories)
  
  useEffect(() => {
    if (historyData?.histories && historyData?.histories.length > 0) {

      dispatch(setHistory(JSON.parse(JSON.stringify(historyData?.histories))))
    }
  },[historyData])

  // Currently the api cannot filter by unclaimed AND won so we do it here
  // when the user has selected Uncollected only include positions they won
  const results = historyData.histories && historyData?.histories[0];
  // historyFilter === HistoryFilter.FAIL ? getUnclaimedWinningBets(bets) : bets

  const hasBetHistory = results && results.length > 0

  let activeTabComponent = null

  switch (activeTab) {
    case HistoryTabs.DETAILS:
      activeTabComponent = <PnlTab hasBetHistory={hasBetHistory} bets={results} />
      break
    case HistoryTabs.TRANSACTIONS:
    default:
      activeTabComponent = <RoundsTab hasBetHistory={hasBetHistory} bets={results} />
      break
  }

  if (!account) {
    activeTabComponent = (
      <Flex justifyContent="center" alignItems="center" flexDirection="column" mt="32px">
        <UnlockButton />
        <Text mt="8px">{t('Connect your wallet to view your prediction history')}</Text>
      </Flex>
    )
  }

  const [onPresentCollectWinningsModal] = useModal(
    <CollectRoundWinningsModal  payout={100} roundId={"okok"} epoch={1} />,
    false,
  )

  return (
    <StyledHistory style={{paddingTop: document.documentElement.clientWidth > 768 ? 74: ""}}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <BetWrapper>
        {fetching ? (
          <SpinnerWrapper>
            <Spinner size={72} />
          </SpinnerWrapper>
        ) : (
          activeTabComponent
        )}
      </BetWrapper>
    </StyledHistory>
  )
}

export default History
