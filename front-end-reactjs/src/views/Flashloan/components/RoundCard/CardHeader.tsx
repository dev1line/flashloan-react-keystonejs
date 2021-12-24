import React, { ReactElement, useState } from 'react'
import { Flex, Text, Box, useModal, BinanceIcon } from '@pancakeswap/uikit'
import styled, { DefaultTheme } from 'styled-components'
import SelectCoin from './SelectCoin'
import {providerType, Coin, State} from "../../../../state/types"
import tokens from "../../../../config/constants/tokens"
import routerV from "../../../../config/constants/routerV"
import { useAppDispatch } from 'state'
import { setReverseCoin } from 'state/Flashloan'
import { useSelector } from 'react-redux'
type Status = 'expired' | 'live' | 'next' | 'soon' | 'canceled' | 'calculating'

interface CardHeaderProps {
  status: Status
  title: string
  epoch: number
  icon?: ReactElement
  hide?: boolean
  isExchange?: boolean
  handleSelect: (e:any, item :object) => void
}

const getBackgroundColor = (theme: DefaultTheme, status: Status) => {
  switch (status) {
    case 'calculating':
      return theme.colors.gradients.cardHeader
    case 'live':
      return 'transparent'
    case 'canceled':
      return theme.colors.warning
    case 'next':
      return theme.colors.secondary
    case 'expired':
    case 'soon':
    default:
      return theme.colors.borderColor
  }
}

type TextColor = 'textDisabled' | 'white' | 'secondary' | 'text' | 'textSubtle'
type FallbackColor = 'text' | 'textSubtle'

const getTextColorByStatus = (status: Status, fallback: FallbackColor): TextColor => {
  switch (status) {
    case 'expired':
      return 'textDisabled'
    case 'next':
      return 'white'
    case 'live':
      return 'secondary'
    case 'canceled':
    case 'calculating':
      return 'text'
    default:
      return fallback
  }
}

const StyledCardHeader = styled.div<{ status: Status }>`
  align-items: center;
  background: ${({ theme, status }) => getBackgroundColor(theme, status)};
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  padding: ${({ status }) => (status === 'live' ? '16px' : '8px')};
`

const Round = styled.div`
  justify-self: center;
`
const Image = styled.img`
   width:20px;
   height:20px;
`
const CardHeader: React.FC<CardHeaderProps> = ({ status, title, epoch, icon, hide, isExchange = false , handleSelect}) => {
  const textColor = getTextColorByStatus(status, 'text')
  const isLive = status === 'live'
  const reverseToken = useSelector((state: State) => state.Flashloan.swiperList[0].token)
  const exchangeProvider = useSelector((state: State) => state.Flashloan.swiperList[epoch].exchange)
  const dataSelect = isExchange ? exchangeProvider : reverseToken;
  const data = useSelector((state: State) => state.Flashloan.swiperList);
  const dispatch = useAppDispatch();
  // console.log("Data:", data, dataSelect, exchangeProvider, reverseToken, isExchange)
  const [onpresentSelectCoin , close] = useModal(
    <SelectCoin list={isExchange ? routerV: tokens} onSelect={handleSelect} isExchange={isExchange} />,
    false,
  )
  return (
    <StyledCardHeader status={status}>
      <Flex alignItems="center">
        {icon}
        <Text color={textColor} bold={isLive} textTransform={isLive ? 'uppercase' : 'capitalize'} lineHeight="21px">
          {title}
        </Text>
        {!hide && <Text fontSize={isLive ? '14px' : '12px'} color={getTextColorByStatus(status, 'textSubtle')} textAlign="center">
          {`#${epoch}`}
        </Text>}
      </Flex>
      <Round style={{display: 'flex', alignItems:'center'}}>
        <Box onClick={onpresentSelectCoin} style={{display:'flex', alignItems:'center', cursor: 'pointer', border: '1px solid #009688',borderRadius: 15, padding: 4}} >
         <Image className="sc-hWZktu hXvPxh" alt="coin-logo"  src={dataSelect?.image} style={{marginRight: 7}}/>
         {isExchange ? 
          <Text>{(dataSelect as providerType)?.provider}</Text>
        :
          <Text>{(dataSelect as Coin)?.symbol}</Text>
        }
        
          <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM iGEvSN"><path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
        </Box>
      </Round>
    </StyledCardHeader>
  )
}

export default CardHeader
