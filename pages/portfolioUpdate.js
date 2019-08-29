import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';
import { updatePortfolio, getPortfolioById } from '../actions'
import { Router } from '../routes';

class PortfolioUpdate extends React.Component {

    static async getInitialProps({ query }) {
        let portfolio = {};
        try {
            portfolio = await getPortfolioById(query.id);
        } catch (err) {
            console.log(err)
        }
        return { portfolio };
    }

    constructor(props) {
        super();
        this.state = {
            error: undefined
        }
    }

    savePortfolio = (portfolioData, { setSubmitting }) => {
        setSubmitting(true);
        updatePortfolio(portfolioData)
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
        const { portfolio } = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='portfolio-create-page' title='Update new portfolio'>
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm initialValues={portfolio} error={error} onSubmit={this.savePortfolio} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(PortfolioUpdate);
