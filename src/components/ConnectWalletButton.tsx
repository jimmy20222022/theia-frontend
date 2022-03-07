import { Button, useWalletModal } from '@theia-my/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Trans from './Trans'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  return (
    <Button
      onClick={() => {
        onPresentConnectModal()
        props.setIsActiveMenu(false)
      }}
      {...props}
    >
      <Trans>Connect Wallet</Trans>
    </Button>
  )
}

export default ConnectWalletButton
