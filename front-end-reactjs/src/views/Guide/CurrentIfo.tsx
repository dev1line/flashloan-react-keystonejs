import React from 'react'
import { GuideConfig } from 'config/constants'
import useGetPublicIfoV2Data from 'hooks/ifo/v2/useGetPublicIfoData'
import useGetWalletIfoV2Data from 'hooks/ifo/v2/useGetWalletIfoData'
import IfoFoldableCard from './components/IfoFoldableCard'
import IfoLayout from './components/IfoLayout'
import Guideteps from './components/Guideteps'
import IfoQuestions from './components/IfoQuestions'
// import Guideteps from './components/IfoSteps'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = GuideConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const publicIfoData = useGetPublicIfoV2Data(activeIfo)
  const walletIfoData = useGetWalletIfoV2Data(activeIfo)

  return (
    <IfoLayout>
      <IfoFoldableCard ifo={activeIfo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} isInitiallyVisible />
      <Guideteps ifo={activeIfo} walletIfoData={walletIfoData} />
      <IfoQuestions />
    </IfoLayout>
  )
}

export default Ifo
