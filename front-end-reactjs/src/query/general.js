import { gql } from '@apollo/client'

export const ALL_HISTORY = gql`
query getHistoriesBySender($sender: String) {
  histories: allHistories(where: {sender: $sender}) {
    name
    history
    profit
    txhash
  }
}
`
