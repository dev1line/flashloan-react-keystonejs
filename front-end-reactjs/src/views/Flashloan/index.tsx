import React, { useEffect, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Helmet } from 'react-helmet-async'
import { useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { useGetFlashloanStatus, useIsChartPaneOpen } from 'state/hooks'

import { HistoryFilter, FlashloanState, Flashloantatus } from 'state/types'

import PageLoader from 'components/PageLoader'

import usePollRoundData from './hooks/usePollRoundData'
import Container from './components/Container'
import CollectWinningsPopup from './components/CollectWinningsPopup'
import SwiperProvider from './context/SwiperProvider'
import Desktop from './Desktop'
import Mobile from './Mobile'
import RiskDisclaimer from './components/RiskDisclaimer'
import ChartDisclaimer from './components/ChartDisclaimer'
import usePersistState from 'hooks/usePersistState'

const FUTURE_ROUND_COUNT = 2 // the number of rounds in the future to show

const Flashloan = () => {
  const { isXl } = useMatchBreakpoints()
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(false, 'pancake_Flashloan_accepted_risk')
  const [hasAcceptedChart, setHasAcceptedChart] = usePersistState(false, 'pancake_Flashloan_chart')
  const { account } = useWeb3React()
  const status = useGetFlashloanStatus()
  const isChartPaneOpen = useIsChartPaneOpen()
  const dispatch = useAppDispatch()

  const isDesktop = isXl
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true)
  const handleAcceptChart = () => setHasAcceptedChart(true)
  const [onPresentRiskDisclaimer] = useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false)
  const [onPresentChartDisclaimer] = useModal(<ChartDisclaimer onSuccess={handleAcceptChart} />, false)

  // TODO: memoize modal's handlers
  const onPresentRiskDisclaimerRef = useRef(onPresentRiskDisclaimer)
  const onPresentChartDisclaimerRef = useRef(onPresentChartDisclaimer)

  // Disclaimer
  useEffect(() => {
    if (!hasAcceptedRisk) {
      onPresentRiskDisclaimerRef.current()
    }
  }, [hasAcceptedRisk, onPresentRiskDisclaimerRef])

  // Chart Disclaimer
  useEffect(() => {
    if (!hasAcceptedChart && isChartPaneOpen) {
      onPresentChartDisclaimerRef.current()
    }
  }, [onPresentChartDisclaimerRef, hasAcceptedChart, isChartPaneOpen])


  usePollRoundData()


  if (status === Flashloantatus.INITIAL) {
    return <PageLoader />
  }

  return (
    <>
      <Helmet>
        <script src="https://s3.tradingview.com/tv.js" type="text/javascript" id="tradingViewWidget" />
      </Helmet>
      <SwiperProvider>
        <Container>
          {isDesktop ? <Desktop /> : <Mobile />}
          <CollectWinningsPopup />
        </Container>
      </SwiperProvider>
    </>
  )
}

export default Flashloan
