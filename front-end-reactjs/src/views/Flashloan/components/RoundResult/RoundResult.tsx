import React from 'react'
import { BinanceIcon, Box, BoxProps, Flex, SyncAltIcon, Text } from '@pancakeswap/uikit'
import { BetPosition, Round, State, StatusBlock } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { formatUsd } from '../../helpers'
import { formatBnb } from 'views/Flashloan/helpers'
import PositionTag from '../PositionTag'
import { LockPriceRow, PrizePoolRow, RoundResultBox } from './styles'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

interface RoundResultProps extends BoxProps {
  round: any
}
const Image = styled.img`
   width:20px;
   height:20px
`

const RoundResult: React.FC<RoundResultProps> = ({ round, children, ...props }) => {

  const betPosition = parseInt(round?.profit) > 0 ? BetPosition.BULL: (parseInt(round?.profit) == 0 ? BetPosition.HOUSE :BetPosition.BEAR)

  const isPositionUp = parseInt(round?.profit) > 0  ? true: false;

  const priceDifference = parseInt(round?.profit);
  // const swiperList = useSelector((state: State) => state.Flashloan.swiperList)
  const {history, name, profit, txhash} = round;
  console.log("DATA:", history, name, profit, txhash)
  const swiperList = JSON.parse(history);
  const ExList = swiperList.filter(i => i.type == StatusBlock.EXCHANGE);
  return (
    <RoundResultBox betPosition={betPosition} {...props}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="textSubtle" fontSize="12px" bold textTransform="uppercase" mb="8px">
        Flash Amount
        </Text>
        <Text color="textSubtle" fontSize="12px" bold textTransform="uppercase" mb="8px">
        Profit
        </Text>
      </Flex>

        <Flex alignItems="center" justifyContent="space-between" mb="16px">
          <Flex>
          <Text color={isPositionUp ? 'success' : 'failure'} bold fontSize="24px">
            {parseInt(swiperList[0].loan).toFixed(2)}
          </Text>
          <BinanceIcon width="20px" ml="5px"/>
          </Flex>
          <PositionTag betPosition={betPosition}>{formatUsd(priceDifference)}</PositionTag>
        </Flex>

          {ExList.map((item, index) => (
             <Flex alignItems="center" justifyContent="space-between" mt="10px" key={index}>
                <Flex display="flex" alignItems="center" minWidth="69px" justifyContent="space-between" >
                  <Image src={item?.tokenIn?.image} width="20px" style={{marginRight:5}} />
                  <Text>{item.tokenIn.symbol}</Text>
                </Flex>   
               <Flex display="flex" flexDirection="column" style={{ border: '1px solid rgb(0, 150, 136)',borderRadius: 15, padding: 4}}>
               <Image src={item?.exchange?.image} width="20px" style={{marginBottom:5}} />
               <SyncAltIcon width="20px" />
               </Flex>
                <Flex display="flex" alignItems="center" minWidth="69px" justifyContent="space-between">
                  <Text>{item.tokenOut.symbol}</Text>
                  <Image src={item?.tokenOut?.image} width="20px" style={{marginLeft:5}} />
                </Flex>            
           </Flex> 
           ))}
            <Flex alignItems="start" justifyContent="space-between" mt="10px" >
            <Box >
                <Text>Your Fee (0.35%):</Text>
            </Box>
            <Flex display="flex" alignItems="center" mt="22px" >
              <Text>
                  {`${swiperList[0]?.loan * 0.035}`}
              </Text>
              <Image src={swiperList[0]?.token?.image} width="20px" style={{marginLeft:5}} />
            </Flex>            
           </Flex> 
    </RoundResultBox>
  )
}

export default RoundResult
