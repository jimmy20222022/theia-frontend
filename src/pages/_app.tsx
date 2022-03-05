import {ResetCSS} from '@theia-my/uikit'
import {ToastListener} from 'contexts/ToastsContext'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import React, {Fragment} from 'react'
import {NextPage} from 'next'
import ErrorBoundary from 'components/ErrorBoundary'
import Providers from 'Providers'
import GlobalStyle from 'style/Global'
import Header from '../views/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../style/index.css'
import '../style/animation.scss'
// This config is required for number formatting
// BigNumber.config({
//     EXPONENTIAL_AT: 1000,
//     DECIMAL_PLACES: 80,
// })

// function GlobalHooks() {}

function MyApp(props: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="description" content="Theia" />
        <meta name="theme-color" content="#1FC7D4" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:description" content="Theia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Theia" />
        <title>Theia</title>
      </Head>
      <Providers>
        <ResetCSS />
        <GlobalStyle />
        <App {...props} />
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? ErrorBoundary : Fragment

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  return (
    <ProductionErrorBoundary>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
      <ToastListener />
    </ProductionErrorBoundary>
  )
}

export default MyApp
