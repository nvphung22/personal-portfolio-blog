import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth'

class Protected extends React.Component {

    static getInitialProps = () => {
        const someProtectedValue = "some Protected Value";
        return { someProtectedValue }
    }

    render() {
        const { someProtectedValue } = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1> I am Protected Page </h1>
                    <h2>{someProtectedValue}</h2>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth(Protected);
