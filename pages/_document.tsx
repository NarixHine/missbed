import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta property='og:url' content='https://missbed.narix.link' />
        <meta property='og:title' content='Missbed' />
        <meta property='og:description' content='An embedding solution for Misskey' />
        <meta property='og:image' content='https://missbed.narix.link/og.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
