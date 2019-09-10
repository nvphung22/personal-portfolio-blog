import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { format } from 'date-fns';

class PortfolioDetail extends React.Component {

    render() {
        const { isOpen, toggle, portfolio } = this.props
        return (
            <div>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}><b>{portfolio.title}</b></ModalHeader>
                    <ModalBody>
                        <p><b>Description: </b>{portfolio.description}</p>
                        <p><b>Company: </b>{portfolio.company}</p>
                        <p><b>Position: </b>{portfolio.position}</p>
                        <p><b>Location: </b>{portfolio.location}</p>
                        <p><b>Start Date: </b>{format(new Date(portfolio.startDate), 'MMMM yyyy')}</p>
                        <p><b>End Date: </b>{portfolio.endDate ? format(new Date(portfolio.endDate), 'MMMM yyyy') : "Still working here"}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PortfolioDetail;