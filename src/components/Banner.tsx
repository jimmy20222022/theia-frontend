import { useEffect } from 'react'
import AOS from 'aos'
import styled from 'styled-components'
import Link from 'next/link'
import { Button, ButtonSecondary } from './Button'

const Wrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;

  @media only screen and (min-width: 992px) {
    padding-top: 53px;
    padding-bottom: 60px;
    height: calc(100vh - 130px);
  }

  @media only screen and (min-width: 1200px) {
    padding-top: 90px;
    padding-bottom: 90px;
  }
  .banner-btn {
    @media only screen and (min-width: 1200px) {
      width: 435px;
      margin-left: auto;
    }
  }
`

const Title = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  margin-bottom: 15px;

  @media only screen and (min-width: 1200px) {
    font-size: 50px;
    line-height: 50px;
    margin: 4px 0 18px 0;
  }
`

const SubTitle = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;

  @media (min-width: 768px) {
    margin-top: unset;
    font-size: 16px;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 20px;
    width: 535px;
    margin-left: auto;
  }

  &.banner-subtitle {
    @media only screen and (min-width: 1200px) {
      width: 435px;
    }
  }
`

const Image = styled.div`
  z-index: 0;
  position: relative;

  @media only screen and (min-width: 992px) {
    position: absolute;
    left: 20%;
  }

  img {
    width: 100%;

    @media (min-width: 768px) {
      position: absolute;
      width: unset;
      right: 0;
    }

    @media (min-width: 992px) {
      position: unset;
      width: 35%;
      transform: translateX(-10%);
    }

    @media (min-width: 1200px) {
      width: 40%;
    }
  }
`

function Banner(props) {
  const { data, onActiveDesc } = props

  useEffect(() => {
    // eslint-disable-next-line no-undef
    AOS.init({
      duration: 1000,
    })
  }, [])

  const handleActiveDesc = () => {
    if (onActiveDesc) {
      onActiveDesc(true)
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="banner-wrapper"
      style={{
        backgroundColor: data.bgColor,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Wrapper className="container">
        <div
          className="row position-relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div className="col-12 col-md-6 position-relative" style={{ zIndex: '100' }}>
            <img src={data.icon} alt="icon" className="banner-icon" data-aos="fade-right" data-aos-delay="50" />
            <Title className="banner-title" data-aos="fade-right" data-aos-delay="200">
              {data.title}
            </Title>
            <div data-aos="fade-right" data-aos-delay="300">
              <Button title={data.btnMain} />
            </div>
          </div>

          <Image className="img-main" data-aos="fade-down" data-aos-delay="500">
            {data.imgSrcSecond && <img className="img-first" src={data.imgSrcSecond} alt="iconGold" />}
            <img className="banner-img" src={data.imgSrc} alt="banner" />
          </Image>

          {/* <div className="col-md-4" ></div> */}
          <div className="col-12 col-md-6 position-relative" style={{ zIndex: 1 }}>
            <SubTitle
              className="banner-subtitle"
              dangerouslySetInnerHTML={{ __html: data.subTitle }}
              data-aos="fade-left"
              data-aos-delay="100"
            />

            {data.btnSec && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                onClick={handleActiveDesc}
                className="banner-btn"
                data-aos="fade-left"
                data-aos-delay="100"
                data-aos-offset="-200"
              >
                <ButtonSecondary title={data.btnSec} />
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Banner
