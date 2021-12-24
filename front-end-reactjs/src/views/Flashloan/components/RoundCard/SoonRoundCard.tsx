import React from 'react'
import { CardBody, Text, WaitIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Round, BetPosition } from 'state/types'
import { useGetCurrentEpoch, useGetTotalIntervalBlocks } from 'state/hooks'


import { RoundResultBox } from '../RoundResult'
import MultiplierArrow from './MultiplierArrow'
import Card from './Card'
import CardHeader from './CardHeader'

interface SoonRoundCardProps {
  round: Round
}

const SoonRoundCard: React.FC<SoonRoundCardProps> = ({ round }) => {
  const { t } = useTranslation()
  const interval = useGetTotalIntervalBlocks()
  const currentEpoch = useGetCurrentEpoch()
  const estimatedEndBlock = round.startBlock + interval

  return (
    <Card>
      <CardHeader
        status="soon"
        icon={<WaitIcon mr="4px" width="21px" />}
        title={t('Later')}
        epoch={round.epoch}
        handleSelect={() => console.log("a")}
      />
      <CardBody p="16px">
        <MultiplierArrow isDisabled />
        <RoundResultBox>
          <Text textAlign="center">
            <Text bold>{t('Entry starts')}</Text>
            <Text fontSize="24px" bold>
              {/* {`~${countdown}`} */}
            </Text>
          </Text>
        </RoundResultBox>
        <MultiplierArrow betPosition={BetPosition.BEAR} isDisabled />
      </CardBody>
    </Card>
  )
}

export default SoonRoundCard
