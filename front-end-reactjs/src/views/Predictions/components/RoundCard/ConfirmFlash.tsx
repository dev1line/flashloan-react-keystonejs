import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Button,
  AutoRenewIcon,
  TrophyGoldIcon,
  Text,
  Flex,
  Heading,
  Box,
  LinkExternal,
  ModalCloseButton,
  ArrowForwardIcon,
  SyncAltIcon,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'

import { markBetAsCollected } from 'state/predictions'
import { useTranslation } from 'contexts/Localization'
import { StatusBlock } from 'state/types'
// import useToast from 'hooks/useToast'
// import { usePredictionsContract } from 'hooks/useContract'

interface ConfirmFlashProps extends InjectedModalProps {
  data: any,
  onSuccess?: () => Promise<void>
  onConfirm: () => void
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`
const Wrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`
const Image = styled.img`
    // margin-right: 14px;
`
const ConfirmFlash: React.FC<ConfirmFlashProps> = ({ data, onDismiss, onSuccess, onConfirm}) => {
  const ExList = data.filter(i => i.type == StatusBlock.EXCHANGE)
  return (
    <Modal minWidth="288px" position="relative" mt="124px">   
      <ModalHeader>
        <ModalTitle>
          <Heading>Confirm</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
          <Text style={{justifyContent:'center'}}>Flashloan Infomation: </Text>
          <Flex alignItems="start" justifyContent="space-between" mt="10px" >
            <Box style={{ textAlign: 'right' }}>
                <Text>Your Token:</Text>
            </Box>
            <Flex display="flex" alignItems="center" >
              <Text>
                  {data[0]?.token?.symbol}
              </Text>
              <Image src={data[0]?.token?.image} width="20px" style={{marginLeft:5}} />
            </Flex>            
           </Flex> 
           <Flex alignItems="start" justifyContent="space-between" mt="10px" >
            <Box style={{ textAlign: 'right' }}>
                <Text>Amount:</Text>
            </Box>
            <Flex display="flex" alignItems="center" >
              <Text>
                  {`${data[0]?.loan}`}
              </Text>
              <Image src={data[0]?.token?.image} width="20px" style={{marginLeft:5}} />
            </Flex>            
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
            <Box style={{ textAlign: 'right' }}>
                <Text>Your Fee (0.35%):</Text>
            </Box>
            <Flex display="flex" alignItems="center" mt="22px" >
              <Text>
                  {`${data[0]?.loan * 0.035}`}
              </Text>
              <Image src={data[0]?.token?.image} width="20px" style={{marginLeft:5}} />
            </Flex>            
           </Flex> 
          <Button
            width="100%"
            mb="8px"
            onClick={onConfirm}
            mt="10px"
          >
          {"Confirm"}
          </Button>
      </ModalBody>
    </Modal>
  )
}

export default ConfirmFlash