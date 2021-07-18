import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import { ServerStyleSheet } from 'styled-components';


export default class Mydocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="description" content="Social media for developers." />
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto&family=Ubuntu:wght@400;700&display=swap" rel="stylesheet"/>
          <link rel="icon" href="/favicon.ico" />

          <link rel='apple-touch-icon' href='/icons/icon-192x192.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='theme-color' content='#fb2943' />

	        {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}