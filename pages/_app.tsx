import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

export default function App({ Component, pageProps }: AppProps) {
  const mode = usePrefersColorScheme()
  useEffect(() => {
    document.documentElement.setAttribute('style', `color-scheme: ${mode === 'light' ? 'light' : 'dark'};`)
  }, [mode])
  return (
    <>
      <Head>
        <title>Missbed</title>
      </Head>
      <Component {...pageProps} />
      <Analytics></Analytics>
    </>
  )
}
