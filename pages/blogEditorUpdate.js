import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import SlateEditor from '../components/slate-editor/Editor';
import { getBlogById } from '../actions';
class BlogEditorUpdate extends React.Component {

    static async getInitialProps({ query }) {
        const blogId = query.id;
        let blog = {};
        try {
            blog = await getBlogById(blogId);
        } catch (err) {
            console.err(err)
        }
        return { blog };
    }

    constructor(props) {
        super();
        this.state = {
            isLoaded: false,
            isSaving: false
        }
    }

    saveBlog = (story, heading) => {
        const blog = {};
        blog.title = heading.title;
        blog.subTitle = heading.subTitle;
        blog.story = story;
        this.setState({ isSaving: true });
        createBlog(blog)
            .then(_ => {
                this.setState({ isSaving: false });
                console.log(_)
            })
            .catch(err => {
                this.setState({ isSaving: false });
                console.error(err.message || "Server Error!");
            })
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    render() {
        const { isLoaded, isSaving } = this.state;
        const {blog} = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass='editor-wrapper' className='blog-editor-page'>
                    {
                        // to avoid the error: 'window is undefined' in HoverMenu.js
                        isLoaded && <SlateEditor initialValue={blog.story} isSaving={isSaving} saveBlog={this.saveBlog} />
                    }
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(BlogEditorUpdate);
