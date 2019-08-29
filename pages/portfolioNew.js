import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';
import { createPortfolio } from '../actions'
import { Router } from '../routes';


const INITIAL_VALUES = {
    title: '',
    description: '',
    company: '',
    position: '',
    location: '',
    startDate: new Date(),
    endDate: new Date()
}

class PortfolioNew extends React.Component {
    constructor(props) {
        super();
        this.state = {
            error: undefined
        }
    }

    savePortfolio = (portfolioData, { setSubmitting }) => {
        setSubmitting(true);
        createPortfolio(portfolioData)
            .then(_ => {
                this.setState({
                    error: undefined
                });
                setSubmitting(false);
                Router.pushRoute('/portfolios');
            })
            .catch(err => {
                const error = err.message || 'Server Error!';
                setSubmitting(false);
                this.setState({ error })
            })
    }

    render() {
        const { error } = this.state;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='portfolio-create-page' title='Create new portfolio'>
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm initialValues={INITIAL_VALUES} error={error} onSubmit={this.savePortfolio} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(PortfolioNew);
