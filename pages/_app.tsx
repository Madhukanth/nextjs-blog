import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'
import Layout from '../components/layout/layout'
import Head from 'next/head'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
