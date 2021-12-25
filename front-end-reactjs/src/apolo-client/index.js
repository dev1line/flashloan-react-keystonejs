import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { API_CMS } from './config'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: API_CMS,
  }),
  cache: new InMemoryCache(),
})
