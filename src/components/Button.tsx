import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.section`
  padding: 13px 17px;
  background: #a8e0a5;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
`

const Title = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #000000;

  @media (min-width: 768px) {
    font-size: 15px;
  }

  @media (min-width: 1200px) {
    padding: 15px 10px;
    font-size: 17px;
  }
`

const ButtonLink = styled.span`
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #000000;
  background: #e0d7a5;
  border-radius: 8px;
  padding: 8px 14px;
  margin-top: 35px;
  cursor: pointer;

  &:hover {
    color: #000000;
  }

  @media (min-width: 768px) {
    margin-top: unset;
    padding: 6px 14px;
    font-size: 15px;
  }

  @media (min-width: 1200px) {
    padding: 8px 16px;
    font-size: 17px;
  }
`

function Button(props) {
  const { title } = props

  return (
    <div className="button btn-main" style={{ marginBottom: '30px' }}>
      <Wrapper>
        <Link href="/swap" passHref>
          <Title>{title}</Title>
        </Link>
      </Wrapper>
    </div>
  )
}

function ButtonSecondary(props) {
  const { title } = props

  return <ButtonLink>{title}</ButtonLink>
}

export { Button, ButtonSecondary }
