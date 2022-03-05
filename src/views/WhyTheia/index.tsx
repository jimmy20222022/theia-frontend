import styled from 'styled-components'
import Banner from '../../components/Banner'

const iconSquare = './images/homepage/icon-square.svg'
const iconIllustration = './images/whyTheiaPage/icon-illustration.svg'

const dataBanner = {
  icon: iconSquare,
  title: 'Why Theia?',
  btnMain: 'Launch Swap',
  imgSrc: iconIllustration,
  subTitle:
    '<p>When the Federal Reserve decided to print 80% of the total US dollar supply within the span of 22 months, we set out on a mission to launch an ecosystem comprising of stablecoins, gold-backed tokens and DeFi platforms that would not only protect the value of our users’ assets, but to also thrive and grow during periods of recession and inflation.</p><p>It starts with bringing back the Gold Standard in the form of a stablecoin called USDG. Each USDG minted is backed by physical gold bullion in vaults secured by Brinks.</p>',
  btnSec: '',
  bgColor: '#d1e4f0',
}

const WhyTheiaWrapper = styled.div`
  .img-main img {
    @media (min-width: 1200px) {
      width: 40%;
      transform: translate(5%, 66px);
    }
    @media (min-width: 1400px) {
      width: 42%;
      transform: translate(12%, 54px);
    }
  }
`

function WhyTheia() {
  return (
    <WhyTheiaWrapper className="whytheia">
      <Banner data={dataBanner} />
    </WhyTheiaWrapper>
  )
}

export default WhyTheia
