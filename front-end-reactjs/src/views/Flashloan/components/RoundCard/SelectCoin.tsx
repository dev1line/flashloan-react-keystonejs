import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Text,
  Flex,
  Heading,
  Box,
  Input,
  ModalCloseButton,

} from '@pancakeswap/uikit'

interface SelectCoinProps extends InjectedModalProps {
  list: any
  onSuccess?: () => Promise<void>
  onSelect: (e:any, item :object) => void
  isExchange?: boolean 
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`

const Image = styled.img`
    width:20px;
    height:20px;
`
const SelectCoin: React.FC<SelectCoinProps> = ({
  list,
  isExchange = false,
  onSelect,
  onDismiss,
  onSuccess,
}) => {
  const [addressToken, setAddressToken] = useState("")
  const handleChange = (e) => {
    // console.log(e);
    setAddressToken(e.target.value)
  }
  return (
    <Modal minWidth="288px" position="relative" mt="124px">   
      <ModalHeader>
        <ModalTitle>
          <Heading>Select a Token</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
        <Flex flexDirection="column">
            <Box>
                <Input id="referral-code" type="text" placeholder='Search name or paste address' value={addressToken} contentEditable="false" style={{marginRight: 10, marginBottom: 24}} onChange={handleChange} />
                <Box style={{overflowY:'scroll', height: 400, marginTop: 8}}>
                    {list.map((item, index) => (                
                        (isExchange) ? 
                        <Box key={index} style={{display:"flex", alignItems:"center", cursor:'pointer'}} onClick={(e) => onSelect(e, item)}>
                            <Image className="sc-hWZktu hXvPxh" alt="ALPACA logo" src={item.image}/>
                            <Box style={{flex: 1, padding: '5px 10px'}}>
                                <Text fontSize='14px'>{item.provider}</Text>
                                <Text fontSize='14px'>{item.address}</Text>
                                <Text fontSize='14px'>{item?.suggest}</Text>
                            </Box>
                        </Box>   
                        :        
                        <Box key={index} style={{display:"flex", alignItems:"center", cursor:'pointer'}} onClick={(e) => onSelect(e, item)}>
                            <Image className="sc-hWZktu hXvPxh" alt="ALPACA logo" src={item.image}/>
                            <Box style={{flex: 1, padding: '5px 10px'}}>
                                <Text fontSize='14px'>{item.symbol}</Text>
                                <Text fontSize='14px'>{item.address}</Text>
                            </Box>
                        </Box>        
                    ))}
                </Box>
            </Box>
            <Text textAlign="center" color="#1fc7d4" style={{cursor:'pointer',fontFamily: 'Kanit, sans-serif', padding: '24px 0px'}}>Manage Tokens</Text>
        </Flex>
      </ModalBody>
    </Modal>
  )
}

export default SelectCoin
