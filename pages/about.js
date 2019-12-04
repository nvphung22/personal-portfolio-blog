import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

class About extends React.Component {

  render() {
    return (
      <BaseLayout title='PhungNV - Learn More About Me' {...this.props.auth}>
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
                  Throughout my career, I always look for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector.
                </p>
                <p>
                  My Github: <a target="_blank" href="https://github.com/phungnv">PhungNV</a>
                </p>
                <p>
                  Contact me at{" "}
                  <a target="_blank" href="mailto:phungnv.bkdn@gmail.com">phungnv.bkdn@gmail.com</a>
                </p>
                <div class="LI-profile-badge" data-version="v1" data-size="medium" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="phụng-nguyễn-706447193"><a class="LI-simple-link" href='https://vn.linkedin.com/in/ph%E1%BB%A5ng-nguy%E1%BB%85n-706447193?trk=profile-badge'>Phụng Nguyễn</a></div>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About;
