import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import SlateEditor from '../components/slate-editor/Editor';

class BlogEditor extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    render() {
        const { isLoaded } = this.state;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass='editor-wrapper' className='blog-editor-page' title='Write your story'>
                    {
                        // to avoid the error: 'window is undefined' in HoverMenu.js
                        isLoaded && <SlateEditor />
                    }
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(BlogEditor);
