import React from 'react'
import { StatusBlock } from 'state/types'
import StartLoanSetUp from './StartLoanSetUp'
import LiveBlockCard from './LiveBlockCard'
import Flash from './Flash'
interface RoundCardProps {
  block: any
  onConfirm?: () => void
  epoch: number
}

const RoundCard: React.FC<RoundCardProps> = ({block, epoch, onConfirm}) => {
  switch(block.type) {
    case StatusBlock.START: {
      return <StartLoanSetUp block={block} />
    }
    case StatusBlock.EXCHANGE: {
      return <LiveBlockCard block={block} epoch={epoch} />
    }
    case StatusBlock.ADD_END: {
      return <Flash block={block} onConfirm={onConfirm} />
    }
    default:    return <LiveBlockCard block={block} epoch={epoch}/>
  } 
}

export default RoundCard
