import React, {useState} from 'react'
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
  Checkbox,
  Input,
  Button,
  ModalCloseButton,
} from '@pancakeswap/uikit'

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
    margin: 0px;

`
const ModalHeaders = styled(ModalHeader)`
    background: linear-gradient(139.73deg , rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
`
const Boxer = styled.div`
 & > button > svg {
   fill:rgb(40, 13, 95);
 }
`
const Info: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
}) => {
  const [avatar,setAvatar] = useState({picture:"", src:""});
  const [username, setUsername] = useState("WuanSan");
  const handleChange = (e) => {
      setUsername(e.target.value);
  }
  // const handleCLose = () => {
  //   window.location.href = "/"
  // }
  const handleChangeAvatar = () => {
    const fileUploader = document.getElementById('file-uploader');
    document.getElementById("lb-upload").click();
    fileUploader.addEventListener('change', (event) => {
      // const files = event.target.files;
      // console.log('files', files);
      
      // const feedback = document.getElementById('feedback');
      // const msg = `File ${files[0].name} uploaded successfully!`;
      // feedback.innerHTML = msg;
    });
  }
  const handleChangeSelect = (event) => {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);
    setAvatar({
      picture,
      src
    })
  }
  return (
    <ModalContainer minWidth="288px" position="relative" >
      <ModalHeaders>
        <ModalTitle>
         <Wrapper>
            <Image src="/images/users-cog-solid.svg" height="20px" width="20px" />
            <Heading ml="5px" color="rgb(40, 13, 95)">
               Profile
            </Heading>
         </Wrapper>   
        </ModalTitle>
    {/* <Boxer onClick={handleCLose}> */}
        <ModalCloseButton onDismiss={onDismiss}/>
    {/* </Boxer> */}
      </ModalHeaders>
      <ModalBody p="24px" maxHeight="90vh">
            <Flex flexDirection="column" justifyContent="space-around" alignItems="center">
                <Heading style={{    
                    color: 'rgb(118, 69, 217)',
                    lineHeight: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 8,
                    fontSize: 12,
                    fontWeight: 'bold'}}>Profile Picture</Heading>
           
                <Image src={ avatar.picture ? avatar.src :"https://candlegenie.io/images/profileplaceholder.jpg"}  style={{ background: 'linear-gradient(rgb(255, 216, 0) 0%, rgb(253, 171, 50) 100%)', borderRadius: '50%', padding:2, width:"100px", height:"100px"}}/>
                
                <Text style={{
                    color: 'rgb(118, 69, 217)',
                    cursor: 'pointer',
                    verticalAlign: 'middle',
                    fontSize: 11,
                    fontWeight: 600,
                }} onClick={handleChangeAvatar} >CHANGE</Text>     
                 <input type="file" id="file-uploader" onChange={handleChangeSelect} style={{visibility:'hidden'}} />
                 <label id="lb-upload" htmlFor="file-uploader"  style={{visibility:'hidden'}}></label>
                <Flex flexDirection="column">
                    <Flex flexDirection="column">
                        <Heading style={{
                            color: 'rgb(118, 69, 217)',
                            lineHeight: 1.5,
                            textTransform: 'uppercase',
                            marginBottom: 5,
                            fontSize: 12,
                            fontWeight: 'bold'
                        }}>User Name</Heading>
                        <Input type="text" value={username} onChange={handleChange} />
                        <Flex mt="20px" mb="88px">
                            <Checkbox scale="sm" />
                            <Text style={{marginLeft: 5}}>Hide me from the leaderboards</Text>
                        </Flex>
                    </Flex>
                    <Button
                        width="100%"
                        mb="8px"
                        style={{ backgroundColor: 'rgb(251, 179, 9)', height:35}}
                        // onClick={onpresentInfo}
                        // isLoading={isPendingTx}
                        // endIcon={isPendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
                    >
                        Save Changes
                    </Button>
                </Flex>
            </Flex>
      </ModalBody>
    </ModalContainer>
  )
}

export default Info;
