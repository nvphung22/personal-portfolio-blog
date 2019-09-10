import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = url => {
  NProgress.start();
}

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
        <meta name="description" content="My name is Phung Nguyen and I am an experienced web developer. I have a Bachelor's degree in Software Engineering and several years of experience working in web development. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I hope to have a change to work with you one day." />
        <meta name="keywords" content="phungnv profile, phungnv blog, phungnv portfolio, phungnv developer, phungnv freelancer, phungnv programming" />
        <meta property="og:title" content="PhungNV - programmer, developer, bloger" />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="My name is Phung Nguyen and I am an experienced web developer. I have a Bachelor's degree in Software Engineering and several years of experience working in web development." />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
        {canonical && <link rel='canonical' href={`${process.env.BASE_URL}${canonical}`} />}
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
        {/* NProgress */}
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css' />
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
