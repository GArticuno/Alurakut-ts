import type { AppProps } from 'next/app'

import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { UserContextProvider } from '../context/UserContext';
import { AlurakutStyles } from '../lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS <3) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    background-color: #ffd6d6;
  }
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}
