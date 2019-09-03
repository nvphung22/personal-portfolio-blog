import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { Container, Row, Col } from 'reactstrap';
import { getUserBlogs } from '../actions';
import { Link } from '../routes';

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

    separateBlogs = (blogs) => {
        const published = [];
        const drafts = [];
        blogs.forEach(blog => {
            blog.status === 'draft' ? drafts.push(blog) : published.push(blog);
        })
        return { published, drafts }
    }

    renderBlogs = (blogs) => {
        debugger;
        return (
            <ul className='user-blogs-list'>
                {
                    blogs.map((blog, index) => {
                        return (
                            <li key={index}>
                                <Link route={`/blogs/${blog._id}/update`}>
                                    <a>{blog.title}</a>
                                </Link>
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
