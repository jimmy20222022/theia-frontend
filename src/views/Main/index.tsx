import styled from 'styled-components'

import CompShared from '../../components/CompShared'

const iconSquare = './images/homepage/icon-square.svg'
const iconIllustration = './images/homepage/icon-illustration.svg'

const HomeWrapper = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media only screen and (min-width: 992px) {
      justify-content: center;
    }
  }

  .image {
    @media only screen and (min-width: 992px) {
      height: 100%;
    }
  }
`

function Home() {
  const data = {
    logo: iconSquare,
    title: 'Preserving asset value <br /> during tough times',
    iconillustration: iconIllustration,
    background: '#e0d7a5',
    buttonPrimary: 'Launch Swap',
  }

  return (
    <HomeWrapper>
      <CompShared data={data} />
    </HomeWrapper>
  )
}

export default Home
