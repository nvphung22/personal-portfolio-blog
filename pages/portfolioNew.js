import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';

class PortfolioNew extends React.Component {

    createPortfolio = (portfolioDate) => {
        alert(JSON.stringify(portfolioDate, null, 2));
    }

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='portfolio-create-page' title='Create new portfolio'>
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm onSubmit={this.createPortfolio} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(PortfolioNew);
