import React from 'react';
import Typed from 'react-typed';
import Particles from 'react-particles-js';
import BaseLayout from '../components/layouts/BaseLayout';
import { Container, Row, Col } from 'reactstrap';

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFlipping: false
    }

    this.roles = ['React.js', 'Next.js', 'Node.js', 'Django (Python)', 'MySQL', 'MongoDB', 'PostgresQL', 'Amazon Web Service', 'PWA', 'SPA', 'Ngnix', 'Linux', 'Server Side Rendering', 'Client Side Rendering'];
  }

  componentDidMount() {
    this.flipCard();
  }

  componentWillUnmount() {
    this.flipCardInterval && clearInterval(this.flipCardInterval);
  }

  flipCard() {
    this.flipCardInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping
      })
    }, 10000);
  }

  renderParticles(isFlipping) {
    return !isFlipping ? (
      <Particles
        params={{
          "particles": {
            "number": {
              "value": 10,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "line_linked": {
              "enable": true
            },
            "move": {
              "speed": 10,
              "out_mode": "out"
            },
            "shape": {
              "type": [
                "images",
              ],
              "images": [
                {
                  "src": "/static/particles/react.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/node.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/angular.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/mongodb.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/html5.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/js.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/python.png",
                  "height": 30,
                  "width": 30
                },
                {
                  "src": "/static/particles/vue.png",
                  "height": 20,
                  "width": 20
                },
                {
                  "src": "/static/particles/css.png",
                  "height": 20,
                  "width": 20
                }
              ]
            },
            "size": {
              "value": 30,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 1,
                "size_min": 10,
                "sync": false
              }
            }
          },
          "retina_detect": true
        }} />
    ) : (
        <Particles
          params={{
            "particles": {
              "number": {
                "value": 50
              },
              "size": {
                "value": 3
              }
            },
            "interactivity": {
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "repulse"
                }
              }
            }
          }} />
      )
  }

  render() {
    const { isFlipping } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <BaseLayout className={`cover ${isFlipping ? 'cover-2' : 'cover-1'}`}
        {...this.props.auth}
        headerType='index'
        title='PhungNV - Portfolio & Blog'
      >
        <div className="main-section">
          <div className="background-image">
            {this.renderParticles(isFlipping)}
            {/* <img alt='background welcome' src="/static/images/background-index.png" /> */}
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section" onClick={() => this.setState({isFlipping: !this.state.isFlipping})}>
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img alt='guy programming' className="image" src="/static/images/cover-1.jpg" />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> English - Vietnamese Translator </h2>
                        <div className="hero-section-content-intro">
                          I'm also interested in translation.
                        </div>
                      </div>
                      <img alt='guy programming' className="image" src="/static/images/cover-2.jpg" />
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {
                      isAuthenticated && <p>Hi {user.name},</p>
                    }
                    Welcome to the portfolio website of PhungNV.
                    Get informed, collaborate and discover projects I was working on through the years!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />


                <div className="hero-welcome-bio">
                  <h2>
                    Let's take a look on my work.
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    )
  }
}

