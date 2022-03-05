import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import styled from 'styled-components'
import Link from 'next/link'
import UserMenu from '../../components/Menu/UserMenu'

const Header = styled.header`
  height: 90px;
  //line-height: 90px;
  position: relative;

  @media (min-width: 768px) {
    height: 130px;
    line-height: 130px;
  }

  .row {
    align-items: center;
  }

  .col-6 {
    padding: 0 15px;
  }
`

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 30px 0;
  z-index: 300;
  background: #ffffff;
  transform: translateX(100%);
  transition: all 0.25s ease-in-out;

  &.isActive {
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    position: relative;
    width: 75%;
    transform: unset;
    padding: unset;
    height: initial;
    margin-bottom: 0;
    z-index: 0;
  }
`

const HamburgerIcon = styled(GiHamburgerMenu)`
  width: 26px;
  height: 26px;
`

const CloseIcon = styled(GrClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 15px;
  right: 15px;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  visibility: hidden;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  transition: all 0.4s ease-in-out;

  &.isActive {
    visibility: visible;
    background: rgba(0, 0, 0, 0.5);
  }
`

const DIV = styled.div`
  padding-left: 100px;
  background: #ffffff;
`

function TheHeader() {
  const [isActiveMenu, setIsActiveMenu] = useState(false)
  //
  return (
    <Header>
      <DIV>
        <div className="col-6 d-md-none d-flex p-3">
          <Link href="/main" passHref>
            <img src="./images/logo.svg" alt="logo" />
          </Link>
        </div>

        <div className="col-6 d-md-none d-flex justify-content-end">
          <HamburgerIcon onClick={() => setIsActiveMenu(!isActiveMenu)} />
        </div>

        <Overlay className={`${isActiveMenu ? 'isActive' : ''}`} onClick={() => setIsActiveMenu(false)} />

        <NavList className={`col-md-9 ${isActiveMenu ? 'isActive' : ''}`}>
          <CloseIcon className="d-md-none" onClick={() => setIsActiveMenu(false)} />

          <p className="d-none d-lg-block">
            <Link href="/main" passHref>
              <img src="./images/logo.svg" alt="logo" />
            </Link>
          </p>

          <p>
            <Link href="/usdg">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>USDG</a>
            </Link>
          </p>

          <p>
            <Link href="/whytheia">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Why Theia?</a>
            </Link>
          </p>

          <p>
            <Link href="/audit">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Audit</a>
            </Link>
          </p>

          <p>
            <Link href="/swap">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Swap</a>
            </Link>
          </p>

          <p>
            <Link href="/earn">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Earn</a>
            </Link>
          </p>

          <p>
            <UserMenu />
          </p>
        </NavList>
      </DIV>
    </Header>
  )
}

export default TheHeader
