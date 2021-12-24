import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: "Home",
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: "Guide",
    icon: 'FarmIcon',
    href: '/guide',
  },
  {
    label: "Flashloan",
    icon: 'PredictionsIcon',
    href: '/flashloan',
  },
  {
    label: "Wallet",
    icon: 'TicketIcon',
    href: '/wallet',
  },
  {
    label: "Token",
    icon: 'TradeIcon',
    href: '/token',
  },
  {
    label: "Referral",
    icon: 'GroupsIcon',
    href: '/referral',
  },
  {
    label: "Contact",
    icon: 'MoreIcon',
    items: [
      {
        label: "Facebook",
        href: 'https://www.facebook.com/profile.php?id=100007182452978',
      },
      {
        label: "Telegram",
        href: 'https://t.me/wuansan',
      },
      {
        label: t('Github'),
        href: 'https://github.com/sinhvienit17',
      },   
    ],
  },
]

export default config
