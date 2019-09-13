// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    // Remove me, I do nothing!
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx)
    //     return { ...initialProps }
    // }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="My name is Phung Nguyen and I am an experienced web developer. I have a Bachelor's degree in Software Engineering and several years of experience working in web development. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I hope to have a change to work with you one day." />
                    <meta name="keywords" content="phungnv profile, phungnv blog, phungnv portfolio, phungnv developer, phungnv freelancer, phungnv programming" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="robots" content="index follow" />
                    <meta property="og:title" content="PhungNV - programmer, developer, bloger" />
                    <meta property="og:locale" content="en_EU" />
                    <meta property="og:url" content={`${process.env.BASE_URL}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="My name is Phung Nguyen and I am an experienced web developer. I have a Bachelor's degree in Software Engineering and several years of experience working in web development." />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
                    <link rel="icon" type="image/ico" href="/static/favicon.ico" />
                    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css' />
                    <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
                    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/6401713.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}