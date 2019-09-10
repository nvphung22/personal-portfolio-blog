import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }
    render() {
        return (
            <BaseLayout title='PhungNV - Error' {...this.props.auth}>
                <BasePage className='error-page' title=''>
                    <p className='mx-auto text-center'>
                        {this.props.statusCode
                            ? `Opps! An error ${this.props.statusCode} occurred on server`
                            : 'Oops! An error occurred on client'}
                    </p>
                </BasePage>
            </BaseLayout>
        )
    }
}
