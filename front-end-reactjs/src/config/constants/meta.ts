import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Flashloan',
  description:
    'A flash loan is relatively new type of uncollateralized lending that has become popular across a number of decentralized finance (DeFi) protocols based on the Ethereum network.These types of loans have made headlines recently because they have been used to exploit a number of vulnerable DeFi protocols, leading to millions of dollars in losses. Yet, advocates argue flash loans introduce an innovative and useful tool to the world of finance for arbitrage and quick trades that weren’t possible before blockchains.Most of us are familiar with normal loans. A len',
  image: '/images/icon.ico',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | Flashloan',
  },
  '/flashloan': {
    title: 'Flashloan | Flashloan',
  },
}
