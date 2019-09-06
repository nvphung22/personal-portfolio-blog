import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { Container, Row, Col, Button } from 'reactstrap';
import { getUserBlogs, updateBlog, deleteBlog } from '../actions';
import { Link } from '../routes';
import PortButtonDropdown from '../components/ButtonDropdown';
import { Router } from '../routes';

class UserBlog extends React.Component {

    static async getInitialProps({ req }) {
        let userBlogs = [];
        try {
            userBlogs = await getUserBlogs(req);
        } catch (err) {
            console.error(err);
        }
        return { userBlogs }
    }

    changeBlogStatus = (blogId, status) => {
        updateBlog(blogId, { status })
            .then(_ => {
                Router.pushRoute('/userBlogs')
            })
            .catch(err => {
                console.error(err)
            })
    }

    deleteBlog = blogId => {
        deleteBlog(blogId)
            .then(_ => {
                Router.pushRoute('/userBlogs')
            })
            .catch(err => {
                console.error(err)
            })
    }

    displayDeleteWarning(blogId) {
        const isConfirm = confirm('Are you sure you want to delete this blog?');
        if (isConfirm) {
            this.deleteBlog(blogId);
        }
    }

    dropdownOptions(blog) {
        const firstOpt = blog.status === 'draft' ? { view: 'Publish', status: 'published' } : { view: 'Make draft', status: 'draft' };
        const secondOpt = 'Delete';
        return [
            {
                text: firstOpt.view,
                handler: () => this.changeBlogStatus(blog._id, firstOpt.status)
            },
            {
                text: secondOpt,
                handler: () => this.displayDeleteWarning(blog._id)
            }
        ]
    }

    separateBlogs = (blogs) => {
        const published = [];
        const drafts = [];
        blogs.forEach(blog => {
            blog.status === 'draft' ? drafts.push(blog) : published.push(blog);
        })
        return { published, drafts }
    }

    renderBlogs = (blogs) => {
        return (
            <ul className='user-blogs-list'>
                {
                    blogs.map((blog, index) => {
                        return (
                            <li key={index}>
                                <Link route={`/blogs/${blog._id}/update`}>
                                    <a>{blog.title}</a>
                                </Link>
                                <PortButtonDropdown items={this.dropdownOptions(blog)} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        const { userBlogs } = this.props;
        const { published, drafts } = this.separateBlogs(userBlogs);
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='user-blog-page' title=''>
                    <Container>
                        <Row>
                            <Link route='/blogs/new'>
                                <Button className='mx-auto text-center' color='primary'>Create a new Blog</Button>
                            </Link>
                        </Row>
                        <Row>
                            <Col md='6' className='mx-auto text-center'>
                                <h2 className='blog-type'>Published blogs</h2>
                                {
                                    this.renderBlogs(published)
                                }
                            </Col>
                            <Col md='6' className='mx-auto text-center'>
                                <h2 className='blog-type'>Draft blogs</h2>
                                {
                                    this.renderBlogs(drafts)
                                }
                            </Col>
                        </Row>
                    </Container>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth()(UserBlog);
