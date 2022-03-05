import React from 'react'
import { light, ModalProvider } from '@theia-my/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'utils/web3React'
import { LanguageProvider } from 'contexts/Localization'
import { ToastsProvider } from 'contexts/ToastsContext'
import { ThemeProvider } from 'styled-components'

const ThemeProviderWrapper = (props) => {
  return <ThemeProvider theme={light} {...props} />
}

const Providers: React.FC<{}> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastsProvider>
        <ThemeProviderWrapper>
          <LanguageProvider>
            <ModalProvider>{children}</ModalProvider>
          </LanguageProvider>
        </ThemeProviderWrapper>
      </ToastsProvider>
    </Web3ReactProvider>
  )
}

export default Providers
