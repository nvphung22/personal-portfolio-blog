import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

class About extends React.Component {

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className='about-page' title=''>
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello, Welcome</h1>
                <h4 className="subtitle fadein">To About Page</h4>
                <p className="subsubTitle fadein">Feel free to read short description about me.</p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>My name is Phung and I am an experienced web developer and freelancer. </p>
                <p>
                  I have a Bachelor's degree in Software Engineering and several years of experience working
                  on a wide range of technologies and projects with Javascript and Python.
                </p>
                <p>
                  Throughout my career, I have acquired advanced technical knowledge and the ability to explain
                  programming topics clearly and in detail to a broad audience.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About;
