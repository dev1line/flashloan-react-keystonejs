import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [

  {
    label: t('Prediction (BETA)'),
    icon: 'PredictionsIcon',
    href: '/',
  },
  {
    label: "Referral",
    icon: 'GroupsIcon',
    href: '/referral',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.pancakeswap.finance/contact-us',
      },
      {
        label: t('Github'),
        href: 'https://github.com/pancakeswap',
      },   
    ],
  },
]

export default config
