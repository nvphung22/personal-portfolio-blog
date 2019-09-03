import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import SlateEditor from '../components/slate-editor/Editor';
import { createBlog } from '../actions';
import { Router } from '../routes';
import { toast } from 'react-toastify';

class BlogEditor extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isLoaded: false,
            isSaving: false,
            lockKey: Math.floor(1000 + Math.random() * 9000) // generate 4 random numbers
        }
    }

    saveBlog = (story, heading) => {
        const { lockKey } = this.state;
        const blog = {};
        blog.title = heading.title;
        blog.subTitle = heading.subTitle;
        blog.story = story;
        this.setState({ isSaving: true });
        createBlog(blog, lockKey)
            .then(createdBlog => {
                this.setState({ isSaving: false });
                toast.success("Saved successfully!");
                Router.pushRoute(`/blogs/${createdBlog._id}/update`);
            })
            .catch(err => {
                this.setState({ isSaving: false });
                const error = err.message || "Server Error!";
                toast.error(error);
            })
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    render() {
        const { isLoaded, isSaving } = this.state;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass='editor-wrapper' className='blog-editor-page'>
                    {
                        // to avoid the error: 'window is undefined' in HoverMenu.js
                        isLoaded && <SlateEditor isSaving={isSaving} saveBlog={this.saveBlog} />
                    }
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(BlogEditor);
