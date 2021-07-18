import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {Cookies } from 'react-cookie-consent';

import { UserContextProvider } from '../context/UserContext';

import { AlurakutStyles } from '../lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  :root {
    --backgroundPrimary: #ffd6d6;
    --backgroundSecondary: #ffeded;
    --backgroundTertiary: #FFFFFF;
    --backgroundQuarternary: #ffa5a5;
    --colorPrimary: #a00808;
    --colorSecondary: #fb2943;
    --colorTertiary: #f8142f;
    --colorQuarternary: #FF6287;
    --textPrimaryColor: #333333;
    --textSecondaryColor: #FFFFFF;
    --textTertiaryColor: #5A5A5A;
    --textQuarternaryColor: #C5C6CA;
    --commonRadius: 8px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient( #fafafa 0%,  #FF6287 100%);;
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
    primary: '#fb2943',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContextProvider githubUser={Cookies.get('user')} Cookies={Boolean(Cookies.get('Cookies'))}>
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}
