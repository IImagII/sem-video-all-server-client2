import { Head, Html, Main, NextScript } from 'next/document'

//систме
export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="theme-color" content="#ff7652" />
        <meta name="msappliaction-navbutton-color" content="#ff7652" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ff7652" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
