import React from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
// import LoadFonts from '../helpers/Fonts';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

// Services
import auth0 from '../services/auth0';

const namespace = process.env.NAMESPACE;
export default class MyApp extends App {
  // Component is each every Page we have
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);
    const isSiteOwner = user && user[namespace + '/role'] === 'siteOwner';
    const auth = { user, isAuthenticated: !!user, isSiteOwner };// isAuthenticated is just a value but we need an object

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, auth }
  }

  componentDidMount() {
    // load fonts on Client side
    // But no need anymore because we switch to use Google Font Link instead of static font file
    // LoadFonts();
  }

  render() {
    const { Component, pageProps, auth } = this.props

    return (
      <React.Fragment>
        <ToastContainer />
        <Component {...pageProps} auth={auth} />
      </React.Fragment>
    )
  }
}
