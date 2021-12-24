/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import maxBy from 'lodash/maxBy'
import merge from 'lodash/merge'
import { BIG_ZERO } from 'utils/bigNumber'
import { Bet, HistoryFilter, Market, FlashloanState, Flashloantatus, Round , Coin, StatusBlock} from 'state/types'
import {
  makeFutureRoundResponse,
  transformRoundResponse,
  makeRoundData,
} from './helpers'

const initialState: FlashloanState = {
  status: Flashloantatus.INITIAL,
  isLoading: false,
  isHistoryPaneOpen: false,
  isChartPaneOpen: false,
  isFetchingHistory: false,
  historyFilter: HistoryFilter.ALL,
  currentEpoch: 0,
  currentRoundStartBlockNumber: 0,
  intervalBlocks: 100,
  bufferBlocks: 2,
  minBetAmount: '1000000000000000',
  lastOraclePrice: BIG_ZERO.toJSON(),
  rounds: {},
  bets: {},
  contract: {
    address: null,
    abi: null,
    provider:null
  },
  reverseCoin: {
      name: "DAI",
      symbol: "DAI",
      image: "/img-coin/4943.png",
      address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"
  },
  swiperList: [
    {
      type: StatusBlock.START,
      loan: 0,
      token: {      
        name: "DAI",
        symbol: "DAI",
        image: "/img-coin/4943.png",
        address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"
      }
    }
  ],
  history: []
}


export const FlashloanSlice = createSlice({
  name: 'Flashloan',
  initialState,
  reducers: {
    setFlashloantatus: (state, action: PayloadAction<Flashloantatus>) => {
      state.status = action.payload
    },
    setHistoryPaneState: (state, action: PayloadAction<boolean>) => {
      state.isHistoryPaneOpen = action.payload
      state.historyFilter = HistoryFilter.ALL
    },
    setContract: (state, action: PayloadAction<any>) => {
      state.contract.address = action.payload.address;
      state.contract.abi= action.payload.abi;
      state.contract.provider= action.payload.provider;
    },
    setReverseCoin: (state, action: PayloadAction<Coin>) => {
      state.swiperList[0].token = action.payload;
      console.log("update:", action.payload)
    },
    addExchange: (state, action: PayloadAction<any>) => {    
      state.swiperList = action.payload
    },
    setExchange: (state, action: PayloadAction<any>) => {    
      state.swiperList[action.payload.index].exchange = action.payload.exchange;
    },
    changeTokenIn: (state, action: PayloadAction<any>) => {   
      console.log("Action.payload in", action.payload)
      state.swiperList[action.payload.index].tokenIn = action.payload.coin;
    },
    changeTokenOut: (state, action: PayloadAction<any>) => {   
      console.log("Action.payload out", action.payload)
      state.swiperList[action.payload.index].tokenOut = action.payload.coin;
    },
    setLoan: (state, action: PayloadAction<any>) => {   
      state.swiperList[0].loan = action.payload;
    },
    setSwiperList: (state, action: PayloadAction<any>) => {
      state.swiperList = action.payload; 
    },
    setHistory: (state, action: PayloadAction<HistoryFilter>) => {
      state.history = action.payload
    },
    setChartPaneState: (state, action: PayloadAction<boolean>) => {
      state.isChartPaneOpen = action.payload
    },
    setHistoryFilter: (state, action: PayloadAction<HistoryFilter>) => {
      state.historyFilter = action.payload
    },  
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    initialize: (state, action: PayloadAction<FlashloanState>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    updateMarketData: (state, action: PayloadAction<{ rounds: Round[]; market: Market }>) => {
      const { rounds, market } = action.payload
      const newRoundData = makeRoundData(rounds)
      const incomingCurrentRound = maxBy(rounds, 'epoch')

      if (state.currentEpoch !== incomingCurrentRound.epoch) {
        // Add new round
        const newestRound = maxBy(rounds, 'epoch') as Round
        const futureRound = transformRoundResponse(
          makeFutureRoundResponse(newestRound.epoch + 2, newestRound.startBlock + state.intervalBlocks),
        )

        newRoundData[futureRound.id] = futureRound
      }

      state.currentEpoch = incomingCurrentRound.epoch
      state.currentRoundStartBlockNumber = incomingCurrentRound.startBlock
      state.status = market.paused ? Flashloantatus.PAUSED : Flashloantatus.LIVE
      state.rounds = { ...state.rounds, ...newRoundData }
    },
    setCurrentEpoch: (state, action: PayloadAction<number>) => {
      state.currentEpoch = action.payload
    },
    markBetAsCollected: (state, action: PayloadAction<{ account: string; roundId: string }>) => {
      const { account, roundId } = action.payload
      const accountBets = state.bets[account]

      if (accountBets && accountBets[roundId]) {
        accountBets[roundId].claimed = true
      }
    },
    markPositionAsEntered: (state, action: PayloadAction<{ account: string; roundId: string; bet: Bet }>) => {
      const { account, roundId, bet } = action.payload

      state.bets = {
        ...state.bets,
        [account]: {
          ...state.bets[account],
          [roundId]: bet,
        },
      }
    },
    setLastOraclePrice: (state, action: PayloadAction<string>) => {
      state.lastOraclePrice = action.payload
    },
  },

})

// Actions
export const {
  initialize,
  setChartPaneState,
  setCurrentEpoch,
  setHistoryFilter,
  setHistoryPaneState,
  updateMarketData,
  markBetAsCollected,
  setFlashloantatus,
  markPositionAsEntered,
  setLastOraclePrice,
  setContract,
  setReverseCoin,
  setSwiperList,
  addExchange,
  setExchange,
  changeTokenIn,
  changeTokenOut,
  setLoan,
  setHistory,
  setLoading
} = FlashloanSlice.actions

export default FlashloanSlice.reducer
