import React, {useEffect} from 'react'
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
import $ from 'jquery'
import useToast from 'hooks/useToast'
import { CREATE_HISTORY } from 'query/mutation'
import { useMutation, useQuery } from '@apollo/client'
import { useWeb3React } from '@web3-react/core'
import { setLoading } from 'state/Flashloan'
import { useAppDispatch } from 'state'
import { ALL_HISTORY } from 'query/general'
import { setHistory } from 'state/Flashloan'
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
  const dispatch = useAppDispatch()
  const { setSwiper } = useSwiper()
  const rounds = useGetSortedRounds()
  const initialIndex = Math.floor(rounds.length / 2)
  const { toastError, toastSuccess } = useToast()

  const { account } = useWeb3React()
  const abi = useSelector((state: State) => state.Flashloan.contract.abi)
  const address = useSelector((state: State) => state.Flashloan.contract.address) 
  const swiperList = useSelector((state: State) => state.Flashloan.swiperList);
  const histories = useSelector((state: State) => state.Flashloan.history)
  const [createHistory] = useMutation(CREATE_HISTORY);
  useEffect(() => {
    $("#menuer > div > div:last-child > div > div:nth-child(2)").css("display", "none")
  },[])

  const handleConfirmFlash = async () => {
  
    console.log("start flash now:", swiperList)

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let txhash = "";
    const contract = new ethers.Contract(
      address,
      abi,
      signer
    );

    const reportError = ({message}: {message: string}) => {
    console.log("report", message.toString())
    const tx = message.slice(37, 103);
    txhash = tx;
    toastError(`An transaction fail in `, `${tx}`)
    }

    const swiperListExchange = swiperList.filter(e => e.type == StatusBlock.EXCHANGE).map(item => (
      [item.tokenIn.address, item.tokenOut.address, item.exchange.address, item.exchange.version - 1]
    ));
      const data = [
        swiperList[0].token.address, 
        ethers.utils.parseEther(`${swiperList[0].loan}`),
        [...swiperListExchange]
      ]
      console.log("data", data, contract)
      try {
        dispatch(setLoading(true));
        const runFlash = await contract.initateFlashLoan(
          data,
          { gasLimit: 12500000, },
        );
        const receipt = await runFlash.wait();
        txhash = receipt.transactionHash;
          toastSuccess("Transaction successfully in ", `${ receipt.transactionHash}`)
      } catch(error: any) {
        console.log(error);
        if (error instanceof Error) 
        reportError({message: error.message})
        else 
        toastError(`${error.message}`)
      }  
     
      const profitValue = await contract.profit();
    
      const history = {
        name: `${histories.length + 1}`,
        history: JSON.stringify(swiperList),
        profit:ethers.utils.formatEther(profitValue),
        txhash,
        sender: account
      }
      console.log("history", history)
      await createHistory({
        variables: {
          history
        },
      });

      dispatch(setLoading(false));
      refetch();
         
  }
  const {
    loading: fetching,  
    error,
    data: historyData = {},
    refetch,
  } = useQuery(ALL_HISTORY, {
    variables: {
        sender: account
    }
  });
  console.log("historyData", historyData?.histories)
  useEffect(() => {
    if (historyData?.histories && historyData?.histories.length > 0) {

      dispatch(setHistory(JSON.parse(JSON.stringify(historyData?.histories))))
    }
  },[historyData])
  return (
    <Box overflow="hidden" >
      { document.documentElement.clientWidth > 768 ? 
        <div 
          id="menuer"
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 1999,
            top: 0
          }}
        >
         <Menu />
        </div>
        :
        <div  
          id="menuer" 
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            transform: 'translateX(-33px)',
            zIndex: 1999,
          }}
        >
          <Menu />
        </div>
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
