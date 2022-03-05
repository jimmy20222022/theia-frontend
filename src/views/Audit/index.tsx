import styled from 'styled-components'

import Banner from '../../components/Banner'

const iconSearch = './images/auditPage/icon-search.svg'
const iconGold = './images/auditPage/icon-gold.svg'
const iconIllustration = './images/auditPage/icon-illustration.svg'

const AuditWrap = styled.div`
  .img-main img.banner-img {
    @media (min-width: 1400px) {
      width: 46%;
    }
  }

  .img-first {
    width: 45%;
    position: absolute;
    z-index: 10;
    bottom: 5px;
    left: 30px;

    @media (min-width: 768px) {
      bottom: -240px;
      right: 180px;
      left: unset;
      width: 24%;
    }

    @media (min-width: 992px) {
      right: unset;
      left: 15px;
      bottom: 5px;
      width: 15%;
    }

    @media (min-width: 1200px) {
      right: unset;
      left: 18px;
      bottom: 7px;
      width: 18%;
    }

    @media (min-width: 1400px) {
      width: 22%;
    }
  }
`

const dataBanner = {
  icon: iconSearch,
  title: 'Audit',
  btnMain: 'Launch Swap',
  imgSrc: iconIllustration,
  imgSrcSecond: iconGold,
  subTitle:
    '<p>Audits are an essential part of what we do. Not only does this ensure that our tokens are fully backed by our treasury, it also serves to build trust among the crypto community.</p><br><p>We’re here for the long haul.</p>',
  btnSec: 'View Audits',
  bgColor: '#e3e3e3',
}

const Audit = () => {
  return (
    <AuditWrap>
      <Banner data={dataBanner} />
    </AuditWrap>
  )
}

export default Audit
