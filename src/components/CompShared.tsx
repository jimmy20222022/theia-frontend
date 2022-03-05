import AOS from 'aos'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const Container = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  width: 100%;
  height: calc(100vh - 90px);

  @media (min-width: 768px) {
    min-height: unset;
    height: calc(100vh - 130px);
  }

  @media only screen and (min-width: 992px) {
    padding-top: 53px;
    padding-bottom: 60px;
  }

  @media only screen and (min-width: 1200px) {
    padding-top: 67px;
    padding-bottom: 77px;
  }

  .row {
    width: 100%;
    //align-items: space-around;

    @media (min-width: 992px) {
      align-items: center;
    }
  }
`

const Content = styled.div`
  h2 {
    margin-bottom: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 43px;
    margin-bottom: 18px;

    @media only screen and (min-width: 768px) {
      font-size: 36px;
    }

    @media only screen and (min-width: 992px) {
      font-size: 50px;
      line-height: 50px;
      margin: 4px 0 18px 0;
    }
  }
`

const Image = styled.div`
  display: flex;
  justify-content: center;
  img {
    @media only screen and (min-width: 992px) {
      display: block;
    }
  }
`

const ButtonReadOn = styled.a`
  margin-top: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  text-decoration: none;

  @media (min-width: 992px) {
    margin-top: 40px;
  }

  @media (min-width: 1200px) {
    margin-top: 60px;
    width: 535px;
  }

  span {
    position: relative;
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  span:after {
    content: '';
    position: absolute;
    top: 19px;
    left: 36px;
    width: 12.9px;
    height: 12.9px;
    margin-left: -12px;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transform: rotate(-45deg);
    @media (min-width: 992px) {
      top: 30px;
      left: 42px;
    }
  }
`

const Desc = styled.div`
  @media only screen and (min-width: 1200px) {
    font-size: 20px;
    width: 535px;
    margin-right: auto;
  }
`

function Section(props) {
  const { data, id } = props

  useEffect(() => {
    // eslint-disable-next-line no-undef
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <div id={`${id}`} style={{ background: data.background }} className="component-share">
      <Container className={`container container-${id + 1}`}>
        <div className="row">
          <div className="content col-lg-6">
            <Content>
              <img src={data.logo} alt="logo" data-aos="fade-right" data-aos-delay="50" />
              <h2 data-aos="fade-right" data-aos-delay="200">{data.title}</h2>
              <Desc dangerouslySetInnerHTML={{ __html: data.desc }} data-aos="fade-right" data-aos-delay="200" />

              {data.buttonTitle && (
                <div data-aos="fade-right" data-aos-delay="300">
                  <ButtonReadOn href={`#${id + 1}`}>
                    <span>{data.buttonTitle}</span>
                  </ButtonReadOn>
                </div>
              )}

              {data.buttonPrimary && <Button title={data.buttonPrimary} />}
            </Content>
          </div>

          <div className="col-lg-6">
            <Image className=" image">
              <img src={data.iconillustration} alt="illustration" data-aos="fade-down" data-aos-delay="300" />
            </Image>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Section
