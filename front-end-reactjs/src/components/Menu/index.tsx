import React, {useEffect} from 'react'
import { useHistory } from 'react-router'
import { Menu as UikitMenu, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useSelector } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config from './config'
import Referral from './Referral'
import Profile from './Profile'
import $ from 'jquery';
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { ethers, Wallet, Contract } from "ethers";
import contractDefinition from "../../config/abi/FlashloanMoneyLego.json"
import { useAppDispatch } from 'state'
import { State } from '../../state/types'
import { setContract } from 'state/Flashloan'
declare let window: any;
const Boxer = styled.div`
& > div > nav > div:first-child > a {
    display: none;
  }
`
const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const dispatch = useAppDispatch()
  const abi = useSelector((state: State) => state.Flashloan.contract.abi)

  useEffect(() => {
    async function runer() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer, account;
      const kovan = {
        name: "kovan",
        networkID: "42",
        erc20: {
          dai: {
            address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
          },
        },
      };
      const contractFlashloanMoneyLegoAddress =
        contractDefinition.networks[kovan.networkID].address;
      try {
        // Prompt user for account connections
        account = await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
      } catch (err) {
        console.log(err);
      }
      if (signer && (await signer.getAddress())) {
        // const contractFlashloanMoneyLego = new ethers.Contract(
        //   contractFlashloanMoneyLegoAddress,
        //   contractDefinition.abi,
        //   signer
        // );
        dispatch(setContract({
          address: contractFlashloanMoneyLegoAddress,
          abi:  contractDefinition.abi,
          provider
        }));


      } else {
        //handle log fail connect
        // console.log("logger:", contractDefinition.abi);
      }
    }
    runer();
  }, [account])
  const [onpresentReferral] = useModal(
    <Referral payout={100} roundId={"okok"} epoch={1} />,
    false,
  )
  useEffect(() => {
    $("#aaa > div > div:last-child  > div:first-child > div:last-child > div:first-child").css("display", "none")
    $("#aaa > div > div:last-child  > div:first-child > div:first-child > div:nth-child(6)").click(() => {
      onpresentReferral()
    })
    $("#aaa > div >  nav:first-child > div:last-child > div:last-child").click(() => {
      onpresentProfile()
    })
  },[]);
  const history = useHistory();
  const profile = {
    username: "yourname",
    image: "https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/51526239_1227159377451868_2319203497125347328_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fHZ8JZhdWTIAX89uoDr&_nc_ht=scontent.fdad1-1.fna&oh=40770e375bc9b3ed58b1520877e7e85f&oe=61CD24D6",
    profileLink: "/profile",
    noProfileLink: "/profile",
    showPip: true
  }
  const { currentLanguage, setLanguage, t } = useTranslation()

 

  const [onpresentProfile] = useModal(
    <Profile payout={100} roundId={"okok"} epoch={1} />,
    false,
  )

  // history.listen((location, action) => {
  //   if(location.pathname === '/referral' ) {
  //     onpresentReferral()
  //   }
  //   if(location.pathname === '/profile') {
  //     onpresentProfile()
  //   }
  // })
  
  useEffect(() => {
    const Imag = () => `<img src="images/icon.ico" id="imgLogo" />`

    $("body").append(`<style>
      #imgLogo {
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        outline: none;
        padding:10px;
      }  
      #txtLg {
        align-self: center;
        font-size: 22px;
        font-weight: bold;
        color: #7e7d88;
      }
      #F_word {
        color: red;
      }
    </style>`)
   $("#aaa > div > nav > div:first-child ").append(Imag)
   $("#aaa > div > nav > div:first-child ").append(`<p id="txtLg" >IT<span id="F_word">F</span>loan</p>`)

  },[]);

  return (  
    <Boxer id="aaa">
      <UikitMenu
          account={account}
          login={login}
          logout={logout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentLang={currentLanguage.code}
          langs={languageList}
          setLang={setLanguage}
          cakePriceUsd={12.09}
          links={config(t)}
          profile={profile}
          {...props}
        />
    </Boxer>
  );
}
export default Menu
