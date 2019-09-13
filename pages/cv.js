import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

class Cv extends React.Component {

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="Preview of my CV" className="cv-page">
          <Row>
            <Col xs={{ size: 10, offset: 1 }}>
              <div className="cv-title">
                <a download="phung_cv.pdf" className="btn btn-success" href="/static/phung_cv.pdf">
                  Download
                </a>
              </div>
              <iframe style={{ width: '100%', height: '800px' }} src="/static/phung_cv.pdf">
              </iframe>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Cv;