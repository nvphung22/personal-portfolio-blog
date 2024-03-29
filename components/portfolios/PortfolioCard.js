import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import PortfolioDetail from './PortfolioDetail';

export default class PortfolioCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { portfolio, children } = this.props;
        const { isOpen } = this.state;
        return (
            <span onClick={this.toggleModal}>
                <PortfolioDetail toggle={this.toggleModal} portfolio={portfolio} isOpen={isOpen} />
                <Card className="portfolio-card">
                    <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
                    <CardBody>
                        <p className="portfolio-card-city">{portfolio.location}</p>
                        <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
                        <CardText className="portfolio-card-text">{portfolio.description}</CardText>
                        <div className="readMore">
                            {children}
                        </div>
                    </CardBody>
                </Card>
            </span>

        )
    }
}