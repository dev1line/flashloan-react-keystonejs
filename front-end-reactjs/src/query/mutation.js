import { gql } from '@apollo/client'

export const CREATE_HISTORY = gql`
  mutation ($history: HistoryCreateInput) {
    createHistory(data: $history) {
      id
    }
  }
`
