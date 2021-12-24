import React from 'react'
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
  Button,
  ModalCloseButton,
} from '@pancakeswap/uikit'
import  Info  from './Info';
import { useModal } from '@pancakeswap/uikit'
interface CollectRoundWinningsModalProps extends InjectedModalProps {
  payout: number
  roundId: string
  epoch: number
  onSuccess?: () => Promise<void>
  onDismiss?:() => void
}

const Wrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`
const Image = styled.img`
    // margin-right: 14px;
`
const ModalHeaders = styled(ModalHeader)`
    background: linear-gradient(139.73deg , rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
`
const Boxer = styled.div`
 & > button > svg {
   fill:rgb(40, 13, 95);
 }
`
const Headinger = styled(Heading)`
    color: rgb(118, 69, 217);
    line-height: 1.5;
    text-transform: uppercase;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
`
const Profile: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
}) => {

  // const handleCLose = () => {
  //   window.location.href = "/"
  // }
  const [onpresentInfo] = useModal(
    <Info payout={100} roundId={"okok"} epoch={1} />,
    false,
  )
  return (
    <ModalContainer minWidth="288px" position="relative" >
      <ModalHeaders>
        <ModalTitle>
         <Wrapper>
            <Image src="/images/users-cog-solid.svg" height="20px" width="20px" />
            <Heading ml="5px" color="rgb(40, 13, 95)">
               Referral Guide
            </Heading>
         </Wrapper>   
        </ModalTitle>
    {/* <Boxer onClick={handleCLose}> */}
        <ModalCloseButton onDismiss={onDismiss}/>
    {/* </Boxer> */}
      </ModalHeaders>
      <ModalBody p="24px" maxHeight="90vh">
      <iframe className="video" title="Guide Video" height="231px" sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation" src="https://youtube.com/embed/rDQuZzRuA3c?autoplay=0"></iframe>
       <Flex flexDirection="column" overflowY="scroll" maxWidth="350px" height="365px">
        <Flex flexDirection="column" mt="10px">
              <Headinger>WHAT IS REFERRAL SYSTEM ?</Headinger>
              <Text>Candle Genie will share its revenue with all users that refer their friends. These are lifetime rewards with unlimited payout potential. You will receive 1% of ALL wagers placed on the Candle Genie platform from any users that you refer</Text>
          </Flex>
          <Flex flexDirection="column" mt="10px">
              <Headinger>HOW REFER A FRIEND ?</Headinger>
              <Text>Please follow these simple steps or watch the instructional video.</Text>
          </Flex>
          <Flex flexDirection="column" mt="10px">
              <Text>1 - Connect your wallet and sign in to access your profile</Text>
              <Text>2 - Copy your referral code from the profile menu</Text>
              <Button
                width="90px"
                mb="8px"
                style={{ backgroundColor: 'rgb(251, 179, 9)', height:35}}
                onClick={onpresentInfo}
                // isLoading={isPendingTx}
                // endIcon={isPendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              >
                Profile
              </Button>
              <Text>3 - Using your code, have your friend connect and login to their profile</Text>
              <Text>4 - Play, win, and have fun</Text>
          </Flex>

          <div style={{marginTop: 5, display:'flex', alignItems:'center'}}><div color="success" font-size="13px" font-weight="bold" style={{color: 'rgb(53, 208, 135)', lineHeight: 1.5, textTransform: 'uppercase', marginRight: 5, fontSize: 13, fontWeight: 'bold'}}>And its done !</div><svg viewBox="0 0 24 24" color="success" width="20px" xmlns="http://www.w3.org/2000/svg" style={{
            alignSelf: 'center',
            fill: 'rgb(53, 208, 135)',
            flexShrink: 0
          }}><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z"></path></svg></div>
          <Flex flexDirection="column" mt="10px">
              <Headinger>HOW TO GET PAID ?</Headinger>
              <Text>Candle Genie will distribute referral payments once per week. The minimum payout amount is 0.1 BNB. If your current rewards are less than 0.1 BNB, your accrued amount will carry over to the next week. Rewards will never expire.</Text>
          </Flex>
          <Flex flexDirection="column" mt="10px">
              <Headinger>WHAT IS MY SHARE ?</Headinger>
              <Text>Win or loss, Candle Genie we will pay you (1%) of the total amount (BNB) that your referral wagered in Prediction, Dice, and/or Event games.</Text>
          </Flex>
          <Flex flexDirection="column" mt="10px">
              <Headinger>HOW WILL I KNOW WHEN I GET PAID ?</Headinger>
              <Text>ou will be able to track all of your referral payments in your referral dashboard.</Text>
          </Flex>

       </Flex>
      </ModalBody>
    </ModalContainer>
  )
}

export default Profile
