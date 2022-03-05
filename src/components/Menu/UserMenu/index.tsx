import { useEffect, useState } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Flex, LogoutIcon, UserMenu as UIKitUserMenu, UserMenuItem, UserMenuVariant } from '@theia-my/uikit'
import useAuth from 'hooks/useAuth'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'

const UserMenu = () => {
  const { t } = useTranslation()
  const { account, error } = useWeb3React()
  const { logout } = useAuth()
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')
  const isWrongNetwork: boolean = error && error instanceof UnsupportedChainIdError

  useEffect(() => {
    setUserMenuText('')
    setUserMenuVariable('default')
  }, [t])

  const UserMenuItems = () => {
    return (
      <>
        <UserMenuItem as="button" onClick={logout}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Disconnect')}
            <LogoutIcon />
          </Flex>
        </UserMenuItem>
      </>
    )
  }

  if (account) {
    return (
      <UIKitUserMenu account={account} text={userMenuText} variant={userMenuVariable}>
        <UserMenuItems />
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      <UIKitUserMenu text={t('Network')} variant="danger">
        <UserMenuItems />
      </UIKitUserMenu>
    )
  }

  return <ConnectWalletButton scale="sm" />
}

export default UserMenu
