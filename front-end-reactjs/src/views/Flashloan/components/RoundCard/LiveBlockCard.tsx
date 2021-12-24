import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { CardBody,Box, Flex, PlayCircleOutlineIcon, ArrowForwardIcon, Skeleton, Text, TooltipText, useTooltip, Button, useModal, BinanceIcon, RemoveIcon, InfoIcon, ChevronDownIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import tokens from 'config/constants/tokens'
import { formatUsd, getBubbleGumBackground } from '../../helpers'
import Card from './Card'
import CardHeader from './CardHeader'
import SelectCoin from './SelectCoin'
import { changeTokenIn, changeTokenOut, setExchange, setSwiperList } from 'state/Flashloan'
import { useAppDispatch } from 'state'
import { Coin, State, StatusBlock } from 'state/types'
import routerV from 'config/constants/routerV'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'
declare let window: any;
const Image = styled.img`
    width: 20px;
    height: 20px;
`
const GradientBorder = styled.div`
  background: linear-gradient(180deg, #53dee9 0%, #7645d9 100%);
  border-radius: 16px;
  padding: 1px;
`
const Buttons = styled(Button)`
  background: transparent;
  outline: none;
`
const GradientCard = styled(Card)`
  background: ${({ theme }) => getBubbleGumBackground(theme)};
`

interface PropsLive {
  block: any
  epoch: number
}
const LiveBlockCard: React.FC<PropsLive> = ({block, epoch}) => {
 console.log("block:", block, epoch)
  const dispatch = useAppDispatch();
  const swiperList = useSelector((state: State) => state.Flashloan.swiperList)
  const abi = useSelector((state: State) => state.Flashloan.contract.abi)
  const address = useSelector((state: State) => state.Flashloan.contract.address) 

  
  
  
  const handleSelectTokenIn = (e, item) => {
    // console.log(e, e.target.value, item)
    const data = {
      coin: item,
      index: epoch
    }
    dispatch(changeTokenIn(data));
    closeTokenIn()
  }
  const handleSelectTokenOut = (e, item) => {
    console.log(item);
    const temp = swiperList.slice();
    const newswiperList = temp.map((i, index) => {
      if(i.type === StatusBlock.EXCHANGE && i.refund && i.tokenIn === block.tokenOut) {
        return {
          type: i.type,
          refund: i.refund,
          tokenIn: item,
          tokenOut: i.tokenOut,
          exchange: i.exchange
        }
      }
      if(i.type === StatusBlock.EXCHANGE && !i.refund && i.tokenOut === block.tokenOut && epoch == index) {
        return {
          type: i.type,
          refund: i.refund,
          tokenIn: i.tokenIn,
          tokenOut: item,
          exchange: i.exchange
        }
      }
      return i;
    })

    const just = newswiperList.filter(i => i.type == StatusBlock.EXCHANGE && !i.refund && i.tokenOut != swiperList[0].token).map(ii => ii.tokenOut);
    just.forEach(iii => {
      if (newswiperList.filter(i => i.type == StatusBlock.EXCHANGE && i.refund && i.tokenIn.address == iii.address).length == 0) {
        newswiperList.push({
          type: StatusBlock.EXCHANGE,
          refund: true,
          tokenIn: iii,
          tokenOut: swiperList[0].token,
          exchange: routerV[0]
        })
      }
    })

    const justOut = newswiperList.filter(i => i.type == StatusBlock.EXCHANGE && !i.refund).map(ii => ii.tokenOut);
    const justIn =  newswiperList.filter(i => i.type == StatusBlock.EXCHANGE && i.refund).map(ii => ii.tokenIn);
    console.log("just", justOut, justIn)
    const data = new Set<Coin>(justIn);
    data.forEach((iii, index) => {
      if(justOut.findIndex(i => i.address == iii.address) < 0 || justIn.filter(its => its == iii).length > 1) {
        const position = newswiperList.findIndex(it => it.tokenIn == iii && it.refund);
        console.log("position", iii, position)
        newswiperList.splice(position, 1);
      }
    })
    console.log("newswiperList", newswiperList)
    dispatch(setSwiperList(newswiperList));
    closeTokenOut()
  }
  const [openSelelctTokenIn, closeTokenIn] = useModal(
    <SelectCoin list={tokens} onSelect={handleSelectTokenIn}  />,
    false,
  )

  const [openSelelctTokenOut, closeTokenOut] = useModal(
    <SelectCoin list={tokens} onSelect={handleSelectTokenOut}  />,
    false,
  )
  const handleSelect = (e, item) => {
    console.log("TIm thay roi nghe:", item)
    const data = {
      index: epoch,
      exchange: item
    }
    dispatch(setExchange(data));
    closeTokenIn()
    closeTokenOut()
  }
  const handleDelExchange = () => {
    const temp = swiperList.slice();
    const newList = [...temp.slice(0, epoch), ...temp.slice(epoch + 1)];
    const lastList = newList.map((item, index) => {
      if(index == 1 && item.type != StatusBlock.ADD_END) {
        return {
          type: item.type,
          refund: item.refund,
          tokenIn: swiperList[0].token,
          tokenOut: item.tokenOut,
          exchange: item.exchange
        }
      }
      return item;
    })
    const justOut = lastList.filter(i => i.type == StatusBlock.EXCHANGE && !i.refund).map(ii => ii.tokenOut);
    const justIn =  lastList.filter(i => i.type == StatusBlock.EXCHANGE && i.refund).map(ii => ii.tokenIn);
    console.log("just", justOut, justIn)
    justIn.forEach((iii, index) => {
      if(justOut.findIndex(i => i.address == iii.address) < 0) {
        const position = lastList.findIndex(i => i.tokenIn === iii && i.refund);
        console.log("position", iii, position)
        lastList.splice(position, 1);
      }
    })
    console.log("lastList", lastList)
    dispatch(setSwiperList(lastList))
  }
  const reportError = ({message}: {message: string}) => {
    console.log("report", message.toString())
    console.log(message.slice(37, 103))
   }
  const handleApprove = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      address,
      abi,
      signer
    );

    try {
      const approve = await contract.approve(block.tokenIn.address, block.exchange.address, ethers.constants.MaxInt256)
      const txHash = await approve.wait();
      console.log("txHash:", txHash)
    } catch(error) {
    console.log(error);
    if (error instanceof Error) 
    reportError({message: error.message})
  }
  }

  return (
    <GradientBorder>
      <GradientCard>
        <CardHeader
          status="live"
          icon={<PlayCircleOutlineIcon mr="4px" width="24px" color="secondary" />}
          title={"Exchange"}
          isExchange={true}
          epoch={epoch}
          handleSelect={handleSelect}
        />
        <CardBody p="16px" style={{display:'flex', justifyContent:'space-around', alignItems: 'center', flexDirection:'column'}}>
         <Flex flexDirection="row" justifyContent="space-between" width="100%">
         <Buttons onClick={(!!block?.refund || epoch === 1) ?() => 1: openSelelctTokenIn } px="12px" py="0px" style={{  boxShadow:(!!block?.refund || epoch === 1) ? 'none': 'rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px'}} >
          <Image className="sc-hWZktu hXvPxh" alt="coin-logo" src={block?.tokenIn?.image} style={{marginRight: 7}}/>
            <Text>{block?.tokenIn?.symbol}</Text>
            <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM iGEvSN"><path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
          </Buttons>
          <ArrowForwardIcon mr="4px" width="24px" color="secondary" />
          <Buttons onClick={!!block?.refund ? () => 1 : openSelelctTokenOut} px="12px" py="0px" style={{  boxShadow: !!block?.refund ? 'none': 'rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px'}} >
          <Image className="sc-hWZktu hXvPxh" alt="coin-logo" src={block?.tokenOut?.image} style={{marginRight: 7}}/>
            <Text>{block?.tokenOut?.symbol}</Text>
            <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM iGEvSN"><path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
          </Buttons>
         </Flex>
         <Flex flexDirection="row" justifyContent="space-between" width="100%">
         <Flex width="40%" mt="16px" style={{alignItems: 'center'}} >
            <InfoIcon style={{fill: '#1FC7D4', width: 28}} />
            <Text mx="5px" color='#1FC7D4' fontWeight="bold" fontSize='16px'>
                Detail
            </Text>
            <ChevronDownIcon style={{fill: '#1FC7D4', width: 28}}/>
        </Flex>
        <Button width="40%" mt="16px" onClick={!!block?.refund ? () => 1 : handleApprove} disabled={!!block?.refund }>
           <Text mx="5px" fontWeight="bold" fontSize='16px'>
                Approve
            </Text>
            <Image className="sc-hWZktu hXvPxh" alt="coin-logo" src={block?.tokenIn?.image} style={{marginLeft: 7}}/>
          </Button>
          <Button width="10%" mt="16px" onClick={!!block?.refund ? () => 1 : handleDelExchange} disabled={!!block?.refund }>
            <RemoveIcon />
          </Button>
           </Flex>
        
          
        </CardBody>
      </GradientCard>
      {/* {tooltipVisible && tooltip} */}
    </GradientBorder>
  )
}

export default LiveBlockCard
