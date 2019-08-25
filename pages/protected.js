import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import axios from 'axios';

class Protected extends React.Component {

    // constructor(props) {
    //     super();
    //     this.state = {
    //         protectedData: []
    //     }
    // }

    // we only use STATE here so we can write like this
    state = {
        protectedData: []
    }

    static getInitialProps = () => {
        const someProtectedValue = "some Protected Value";
        return { someProtectedValue }
    }

    async componentDidMount() {
        const res = await axios.get('/api/v1/protected');
        const protectedData = res.data;
        this.setState({
            protectedData
        })
    }

    displayProtectedData = () => {
        const { protectedData } = this.state;
        if (protectedData && protectedData.length > 0) {
            return protectedData.map((data, index) => {
                return (
                    <div key={index}>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                )
            })
        }
        return null;
    }

    render() {
        const { someProtectedValue } = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1> I am Protected Page </h1>
                    <h2>{someProtectedValue}</h2>
                    {this.displayProtectedData()}
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth(Protected);
