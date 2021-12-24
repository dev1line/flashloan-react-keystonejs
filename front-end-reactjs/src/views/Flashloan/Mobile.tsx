import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@pancakeswap/uikit'
import { useGetFlashloanStatus, useIsChartPaneOpen, useIsHistoryPaneOpen } from 'state/hooks'
import { Flashloantatus } from 'state/types'
import MobileMenu from './components/MobileMenu'
import History from './History'
import Positions from './Positions'
import Chart from './Chart'
import { ErrorNotification, PauseNotification } from './components/Notification'

enum PageView {
  POSITIONS = 'positions',
  HISTORY = 'history',
  CHART = 'chart',
}

const StyledMobile = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;

  ${({ theme }) => theme.mediaQueries.xl} {
    display: none;
  }
`

const View = styled.div<{ isVisible: boolean }>`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`

const getView = (isHistoryPaneOpen: boolean, isChartPaneOpen: boolean): PageView => {
  if (isHistoryPaneOpen) {
    return PageView.HISTORY
  }

  if (isChartPaneOpen) {
    return PageView.CHART
  }

  return PageView.POSITIONS
}

const Mobile: React.FC = () => {
  const isHistoryPaneOpen = useIsHistoryPaneOpen()
  const isChartPaneOpen = useIsChartPaneOpen()
  const view = getView(isHistoryPaneOpen, isChartPaneOpen)
  const status = useGetFlashloanStatus()

  return (
    <StyledMobile>
      <Box height="100%" overflow="hidden" position="relative" style={{justifyContent: 'center'}}>
        <View isVisible={view === PageView.POSITIONS}>
          <Flex alignItems="center" height="100%" style={{transform: 'translateX(33px)'}}>
            {status === Flashloantatus.ERROR && <ErrorNotification />}
            {status === Flashloantatus.PAUSED && <PauseNotification />}
            {status === Flashloantatus.LIVE && <Positions />}
          </Flex>
        </View>
        <View isVisible={view === PageView.CHART}>
          <Chart />
        </View>
        <View isVisible={view === PageView.HISTORY}>
          <History />
        </View>
      </Box>
      <MobileMenu />
    </StyledMobile>
  )
}

export default Mobile
