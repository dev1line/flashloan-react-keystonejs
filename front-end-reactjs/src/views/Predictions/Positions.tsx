import React, {useState} from 'react'
import styled from 'styled-components'
import SwiperCore, { Keyboard, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box } from '@pancakeswap/uikit'
import { useGetSortedRounds } from 'state/hooks'
import 'swiper/swiper.min.css'
import RoundCard from './components/RoundCard'
import Menu from './components/Menu'
import useSwiper from './hooks/useSwiper'
import { State, StatusBlock } from 'state/types'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'
declare let window: any;

SwiperCore.use([Keyboard, Mousewheel])

const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 345px;
  }
`
const Positions: React.FC = () => {
  const { setSwiper } = useSwiper()
  const rounds = useGetSortedRounds()
  const initialIndex = Math.floor(rounds.length / 2)

  const abi = useSelector((state: State) => state.predictions.contract.abi)
  const address = useSelector((state: State) => state.predictions.contract.address) 
  // const provider = useSelector((state: State) => state.predictions.contract.provider) 
  const swiperList = useSelector((state: State) => state.predictions.swiperList);
  const handleConfirmFlash = async () => {
  console.log("start flash now:", swiperList)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    address,
    abi,
    signer
  );

  const reportError = ({message}: {message: string}) => {
   console.log("report", message.toString())
   console.log(message.slice(37, 103))
  }

  const swiperListExchange = swiperList.filter(e => e.type == StatusBlock.EXCHANGE).map(item => (
    [item.tokenIn.address, item.tokenOut.address, item.exchange.address, item.exchange.version - 1]
  ));
    const data = [
      swiperList[0].token.address, 
      // swiperList[0].loan,
      ethers.utils.parseEther(`${swiperList[0].loan}`),
      [...swiperListExchange]
    ]
    console.log("data", data, contract)
  //   const aprDAI = await contract.approve("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",  ethers.utils.parseEther("1000"), { gasLimit: 12500000, }, );
  // const aDai = await aprDAI.wait();
  // const aprBAT = await contract.approve("0xd100d3cD2aDA4260009575A976D1E78159e275D2", "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",  ethers.utils.parseEther("1000"),  { gasLimit: 12500000, }, );
  // const aBat = await aprBAT.wait();
  try {
    const runFlash = await contract.initateFlashLoan(
      // [
      //   "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
      //   ethers.utils.parseEther("1000"),
      //   [
      //     // [
      //     //   "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
      //     //   "0xd100d3cD2aDA4260009575A976D1E78159e275D2",
      //     //   100000000,
      //     //   "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      //     //   1
      //     // ],
      //     // [
      //     //   "0xd100d3cD2aDA4260009575A976D1E78159e275D2",
      //     //   "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
      //     //   100000000,
      //     //   "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      //     //   1
      //     // ],
      //     [
      //       "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
      //       "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
      //       // 100000000,
      //       "0x54Ac34e5cE84C501165674782582ADce2FDdc8F4",
      //       0 
      //     ],
      //     [
      //       "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
      //       "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
      //       // 100000000,
      //       "0xECc6C0542710a0EF07966D7d1B10fA38bbb86523",
      //       0
      //     ]
      //   ]
      // ],
      data,
      { gasLimit: 12500000, },
    );
    const txHash = await runFlash.wait();
      console.log("txHash:", txHash)
  } catch(error) {
    console.log(error);
    if (error instanceof Error) 
    reportError({message: error.message})
  }
  
  }
  //box width="100%"  id="bbb"
  return (
    <Box overflow="hidden" >
      {document.documentElement.clientWidth > 768 ? 
       <div 
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 1999,
          top: 0
        }}
      
      ><Menu /></div>
    :
    <div style={{
      position: 'absolute',
      top: 0,
      width: '100%',
      transform: 'translateX(-33px)',
      zIndex: 1999,
      
    }}><Menu /></div>
    }
      <StyledSwiper >
        <Swiper
          initialSlide={initialIndex}
          onSwiper={setSwiper}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode
          freeModeSticky
          centeredSlides
          mousewheel
          keyboard
          resizeObserver
          direction='vertical'
        >
          {swiperList.map((block, index) => (
            <SwiperSlide key={index + "s"}>
               <RoundCard block={block} epoch={index} onConfirm={handleConfirmFlash} />
             </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
    </Box>
  )
}

export default Positions
