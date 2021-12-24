import React, { lazy, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ApolloProvider } from "@apollo/client";
import {client} from "apolo-client"
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'

import history from './routerHistory'
import useEagerConnect from 'hooks/useEagerConnect'
// import {ALL_HISTORY} from "./query/general"

const NotFound = lazy(() => import('./views/NotFound'))
const Home = lazy(() => import('./views/Home'))
const Guide = lazy(() => import('./views/Guide'))
const Token = lazy(() => import('./views/Token'))
const Wallet = lazy(() => import('./views/Wallet'))
const Flashloan = lazy(() => import('./views/Flashloan'))
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // useEffect(async () => {
  //   const {data} = await client.query({ query: ALL_HISTORY});
  //   console.log(data);
  // }, [])
  useEagerConnect()
  return (
    <ApolloProvider client={client}>
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
            <Home />
            </Route>     
            <Route path="/guide" exact>
            <Guide />
            </Route> 
            <Route path="/token" exact>
            <Token />
            </Route> 
            <Route path="/wallet" exact>
            <Wallet />
            </Route> 
            <Route path="/flashloan" exact>
            <Flashloan />
            </Route>    
            <Route path="/referral" exact>
            <Flashloan />
            </Route>
            <Route path="/profile" exact>
            <Flashloan />
            </Route>    
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
    </ApolloProvider>
  )
}

export default React.memo(App)
