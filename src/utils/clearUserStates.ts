import * as Sentry from '@sentry/react'
import { connectorLocalStorageKey } from '@theia-my/uikit'
import { connectorsByName } from './web3React'

export const clearUserStates = () => {
  Sentry.configureScope((scope) => scope.setUser(null))
  // This localStorage key is set by @web3-react/walletconnect-connector
  if (window.localStorage.getItem('walletconnect')) {
    connectorsByName.walletconnect.close()
    connectorsByName.walletconnect.walletConnectProvider = null
  }
  window.localStorage.removeItem(connectorLocalStorageKey)
}
