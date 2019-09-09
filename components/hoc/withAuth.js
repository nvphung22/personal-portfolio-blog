import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';

const namespace = process.env.NAMESPACE;

export default role => Component =>
    class withAuth extends React.Component {
        static async getInitialProps(args) {
            const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);

            return { ...pageProps };
        }

        renderProtectedPage = () => {
            const { isAuthenticated, user } = this.props.auth;
            const userRole = user && user[`${namespace}/role`];
            let isAuthorized = false;

            if (role) {
                // only users with a specific role can visit this Page
                if (userRole && userRole === role) {
                    isAuthorized = true;
                }
            } else {
                // any role can visit this Page
                isAuthorized = true;
            }

            if (!isAuthenticated) {
                return (
                    <BaseLayout {...this.props.auth}>
                        <BasePage>
                            <h1>Please login!</h1>
                        </BasePage>
                    </BaseLayout>
                )
            } else if (!isAuthorized) {
                return (
                    <BaseLayout {...this.props.auth}>
                        <BasePage>
                            <h1>You don't have permission to visit this Page!</h1>
                        </BasePage>
                    </BaseLayout>
                )
            } else {
                return (
                    <Component {...this.props} />
                )
            }
        }

        render() {
            return this.renderProtectedPage()
        }
    }

