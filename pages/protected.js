import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { getProtectedData } from '../actions'

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

    static async getInitialProps({ req }) {
        const anotherProtectedValue = await getProtectedData(req);
        return { anotherProtectedValue }
    }

    async componentDidMount() {
        const protectedData = await getProtectedData();
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

export default withAuth()(Protected);
