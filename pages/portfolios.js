import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col, Button } from "reactstrap";
import PortfolioCard from '../components/portfolios/PortfolioCard'

import { getPortfolios, deletePortfolio } from '../actions';
import { Router } from '../routes';
class Portfolios extends React.Component {

  static async getInitialProps() {
    let portfolios = [];
    try {
      portfolios = await getPortfolios();
    } catch (err) {
      console.error(err)
    }
    return { portfolios };
  }

  displayDeleteWarning(portfolioId) {
    const isConfirm = confirm('Are you sure you want to delete this portfolio?');
    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
      .then(_ => {
        // refresh
        Router.pushRoute('/portfolios')
      })
      .catch(err => {
        console.error(err);
      })
  }

  navigateToEdit(portfolioId, event) {
    event.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/update`)
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return portfolios.map((portfolio, index) => {
      return (
        <Col key={index} md="4">
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner &&
              <React.Fragment>
                <Button onClick={(event) => this.navigateToEdit(portfolio._id, event)} color='warning'>Update</Button>
                {'  '}
                <Button onClick={(event) => {
                  // another way to stopPropagation
                  event.stopPropagation();
                  this.displayDeleteWarning(portfolio._id)
                }} color='danger'>Delete</Button>
              </React.Fragment>
            }
          </PortfolioCard>
        </Col>
      )
    })
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className='portfolio-page' title='Portfolios'>
          {isAuthenticated && isSiteOwner &&
            <Button onClick={() => Router.pushRoute('/portfolios/new')} color='success' className='create-port-btn'>
              Create a Portfolio
            </Button>
          }
          <Row>
            {this.renderPortfolios(portfolios)}
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolios;
