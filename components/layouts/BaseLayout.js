import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const BaseLayout = (props) => {
  const { className, children, isAuthenticated, user, isSiteOwner, canonical } = props;
  const headerType = props.headerType || 'default';
  const title = props.title || 'PhungNV Portfolio & Blog';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        {canonical && <link rel='canonical' href={`${process.env.BASE_URL}${canonical}`} />}
      </Head>
      <div className="layout-container" >
        <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} user={user} isSiteOwner={isSiteOwner} />
        <main className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;
