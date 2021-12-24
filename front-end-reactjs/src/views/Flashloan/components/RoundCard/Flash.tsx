import React, { useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Box, Flex, CardBody, Button, Text, useModal } from '@pancakeswap/uikit'
import Card from './Card'
import ConfirmFlash from './ConfirmFlash'
import { addExchange } from 'state/Flashloan'
import { State, StatusBlock } from 'state/types'
import { useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import routerV from 'config/constants/routerV'
const StyledFlash = styled(Card)`
  opacity: 0.7;
  transition: opacity 300ms;

  &:hover {
    opacity: 1;
  }
`
interface PropsFlash {
  block: any
  onConfirm?: () => void
}
const Flash: React.FC<PropsFlash> = ({ block, onConfirm }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const swiperList = useSelector((state: State) => state.Flashloan.swiperList)
  const tokenLoan = useSelector((state: State) => state.Flashloan.swiperList[0].token)
  const position = swiperList.indexOf(swiperList.find(i => i.type === StatusBlock.ADD_END))

  const handleAdd = () => {
    const data = {
      index: position,
      prepend: {
        type: StatusBlock.EXCHANGE,
        refund: false,
        tokenIn: tokenLoan,
        tokenOut: {
          name: "Basic Attention Token",
          symbol: "BAT",
          image: "/img-coin/1697.png",
          address: "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738"
        },
        exchange: {
          version: 1,
          provider: "UNISWAP V1",
          address: "0xECc6C0542710a0EF07966D7d1B10fA38bbb86523",
          suggest: "BAT -> DAI",
          image: "/img-coin/7083.png"
        },
      },
      append: {
        type: StatusBlock.EXCHANGE,
        refund: true,
        tokenIn: {
          name: "Basic Attention Token",
          symbol: "BAT",
          image: "/img-coin/1697.png",
          address: "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738"
        },
        tokenOut: tokenLoan,
        exchange: {
          version: 1,
          provider: "UNISWAP V1",
          address: "0xECc6C0542710a0EF07966D7d1B10fA38bbb86523",
          suggest: "BAT -> DAI",
          image: "/img-coin/7083.png"
        },
      }
    };
    const temp = [...swiperList.slice(0, data.index), data.prepend, swiperList[data.index], ...swiperList.slice(data.index + 1)];
    const just = temp.filter(i => i.type == StatusBlock.EXCHANGE && !i.refund && i.tokenOut != swiperList[0].token).map(ii => ii.tokenOut);
    just.forEach(iii => {
      if (temp.filter(i => i.type == StatusBlock.EXCHANGE && i.refund && i.tokenIn.address == iii.address).length == 0) {
        temp.push({
          type: StatusBlock.EXCHANGE,
          refund: true,
          tokenIn: iii,
          tokenOut: swiperList[0].token,
          exchange: routerV[0]
        })
      }
    })
    // temp.filter(i => i.type == StatusBlock.EXCHANGE && i.refund)
    console.log("just", just)
    dispatch(addExchange(temp))
  }
  const [onpresentFlash] = useModal(
    <ConfirmFlash onConfirm={onConfirm} data={swiperList} />,
    false,
  )

  return (
    <Box position="relative">
      <StyledFlash>

        <CardBody p="16px" style={{ position: 'relative' }}>
          <Text color="#7645D9" fontWeight="bold" textTransform='uppercase' textAlign="center">Action</Text>
          <Flex justifyContent="space-between">
            <Button width="100%" mt="16px" mr="14px" onClick={handleAdd}>Add</Button>
            <Button width="100%" mt="16px" onClick={onpresentFlash}>Flash</Button>
          </Flex>
        </CardBody>
      </StyledFlash>

    </Box>
  )
}

export default Flash
