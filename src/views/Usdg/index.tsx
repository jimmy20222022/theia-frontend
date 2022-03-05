import styled from 'styled-components'
import { useState } from 'react'
import Banner from '../../components/Banner'
import CompShared from '../../components/CompShared'

const iconUsdg = './images/usdgPage/icon-usdg.svg'
const usdgBanner = './images/usdgPage/usdg-banner.svg'
const iconillustration = './images/usdgPage/icon-Illustration-1.svg'
const iconillustration2 = './images/usdgPage/icon-Illustration-2.svg'
const iconillustration3 = './images/usdgPage/icon-illustration-3.svg'

const dataBanner = {
  icon: iconUsdg,
  title: 'USDG',
  imgSrc: usdgBanner,
  btnMain: 'Buy USDG',
  subTitle:
    '<p>USDG - a stablecoin pegged to the US dollar and backed by gold, offers the same stability and convenience of other US dollar-pegged stablecoins with a few added benefits.</p><p>These benefits allow investors to not only safely preserve and grow the value of their holdings during a recession or holdings during a recession or inflationary period, but also share in the revenue gained by our protocol.</p>',
  btnSec: 'Learn More',
  bgColor: '#a9c37b',
}

const dataContent = [
  {
    logo: iconUsdg,
    title: 'USDG',
    desc: `<p>Stablecoins were originally created as a store of value and a medium of exchange, allowing users to use it like fiat currency within a crypto environment.</p>
    <p>Then, on December 18, 2021 Techstartups.com released an article titled:</p>
    <b><i>"80% of all US dollars in existence were printed in the last 22 months (from $4 trillion in January 2020 to $20 trillion in October 2021)"</i></b>`,
    buttonTitle: 'Read on',
    iconillustration,
    background: '#a9c37b',
  },
  {
    logo: iconUsdg,
    title: 'USDG',
    desc: `<p>In short, stablecoins pegged to the US dollar and backed by US fiat currency can no longer be used as a store of value. The same is true for stablecoins backed by volatile assets and commercial paper.</p>
    <p>Built out of necessity to keep crypto and DeFi from crashing due to the actions of centralized parties, USDG is a 100% collaterized stablecoin that is backed by gold and other inflation-proof assets. This allows for long term price stability. How does it work exactly?</p>`,
    buttonTitle: 'Read on',
    iconillustration: iconillustration2,
    background: '#a9c37b',
  },
  {
    logo: iconUsdg,
    title: 'USDG',
    desc: `<p>For every minted USDG, there must be an equal deposit of wPAXG into our treasury. Our core focus is to maintain collateralization at or above 100%.</p>
    <p>Users can also opt to support the protocol by staking their USDG to earn sUSDG. This grants users rights to a share in the revenue earned by the protocol, early access to new projects and airdrops.</p>`,
    buttonTitle: '',
    iconillustration: iconillustration3,
    background: '#a9c37b',
  },
]

// const usdg1 = {
//   desc: `<p>Stablecoins were originally created as a store of value and a medium of exchange, allowing users to use it like fiat currency within a crypto environment.</p>
//   <p>Then, on December 18, 2021 Techstartups.com released an article titled:</p>
//   <b><i>"80% of all US dollars in existence were printed in the last 22 months (from $4 trillion in January 2020 to $20 trillion in October 2021)"</i></b>`,
//   buttonLink: 'Read on',
//   iconillustration,
// }
// const usdg2 = {
//   desc: `<p>In short, stablecoins pegged to the US dollar and backed by US fiat currency can no longer be used as a store of value. The same is true for stablecoins backed by volatile assets and commercial paper.</p>
//   <p>Built out of necessity to keep crypto and DeFi from crashing due to the actions of centralized parties, USDG is a 100% collaterized stablecoin that is backed by gold and other inflation-proof assets. This allows for long term price stability. How does it work exactly?</p>`,
//   buttonLink: 'Read on',
//   iconillustration: iconillustration2,
// }
// const usdg3 = {
//   desc: `<p>For every minted USDG, there must be an equal deposit of wPAXG into our treasury. Our core focus is to maintain collateralization at or above 100%.</p>
//   <p>Users can also opt to support the protocol by staking their USDG to earn sUSDG. This grants users rights to a share in the revenue earned by the protocol, early access to new projects and airdrops.</p>`,
//   buttonLink: '',
//   iconillustration: iconillustration3,
// }

const UsdgWrapper = styled.div`
  .img-main img {
    @media (min-width: 1200px) {
      width: 46%;
      transform: translate(-10%, -20px);
    }
    @media (min-width: 1400px) {
      width: 48%;
      transform: translate(0, -40px);
    }
  }

  .container-1,
  .container-2,
  .container-3 {
    .image {
      @media (min-width: 992px) {
        margin-top: 130px;
      }

      @media (min-width: 1400px) {
        transform: translateX(-60px);
        margin-top: 100px;
      }
    }

    .image img {
      width: 100%;
      @media (min-width: 768px) {
        margin: 0;
        width: 90%;
      }

      @media (min-width: 992px) {
        margin: unset;
        width: 120%;
      }
    }
  }

  .container-2 {
    .image {
      @media (min-width: 1200px) {
        margin-top: 180px;
      }
      @media (min-width: 1400px) {
        margin-top: 160px;
      }
    }
  }

  .container-3 {
    .image {
      @media (min-width: 1200px) {
        margin-top: 170px;
      }
      @media (min-width: 1400px) {
        margin-top: 150px;
      }
    }
  }
`

function Usdg() {
  const [isActive, setIsActive] = useState(false)

  const handleActiveDesc = (value) => {
    setIsActive(value)
  }

  return (
    <UsdgWrapper>
      <div className={`usdg-container ${isActive ? 'isActive' : ''}`}>
        {isActive ? (
          dataContent.map((data, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <CompShared data={data} id={index} key={index} />
            )
          })
        ) : (
          <Banner onActiveDesc={handleActiveDesc} data={dataBanner} />
        )}
      </div>
    </UsdgWrapper>
  )
}

export default Usdg
