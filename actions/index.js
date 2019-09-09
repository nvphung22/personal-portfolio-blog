import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
    baseURL: `${process.env.BASE_URL}/api/v1`,
    timeout: 3000
})

const setAuthHeader = req => {
    // if(req) { clientAuth } else { serverAuth }
    const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } }
    }
    return undefined;
}

const rejectPromise = resError => {
    let error = {};
    if (resError && resError.response && resError.response.data) {
        error = resError.response.data;
    } else {
        error = resError;
    }
    return Promise.reject(error);
}

export const getProtectedData = req => {
    const url = '/protected';
    return axiosInstance.get(url, setAuthHeader(req))
        .then(response => response.data)
}

// PORTFOLIOS

export const getPortfolios = () => {
    return axiosInstance.get('/portfolios')
        .then(response => response.data)
}

export const getPortfolioById = id => {
    return axiosInstance.get(`/portfolios/${id}`)
        .then(response => response.data)
}

export const createPortfolio = portfolioData => {
    return axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
        .then(response => response.data)
        .catch(err => rejectPromise(err))
}

export const updatePortfolio = portfolioData => {
    const portfolioId = portfolioData._id;
    return axiosInstance.patch(`/portfolios/${portfolioId}`, portfolioData, setAuthHeader())
        .then(response => response.data)
        .catch(err => rejectPromise(err))
}

export const deletePortfolio = portfolioId => {
    return axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader())
        .then(response => response.data)
}

// BLOGS

export const getPublishedBlogs = () => {
    return axiosInstance.get('/blogs')
        .then(response => response.data)
}

export const getBlogById = id => {
    return axiosInstance.get(`/blogs/${id}`)
        .then(response => response.data)
}

export const getBlogBySlug = slug => {
    return axiosInstance.get(`/blogs/s/${slug}`)
        .then(response => response.data)
}

// TEST
// export const createBlog = blogData => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Saved")
//         }, 1000)
//     })
// }

export const createBlog = (blogData, lockKey) => {
    return axiosInstance.post(`/blogs?lockKey=${lockKey}`, blogData, setAuthHeader())
        .then(response => response.data)
        .catch(err => rejectPromise(err))
}

export const updateBlog = (blogId, newBlogData) => {
    return axiosInstance.patch(`/blogs/${blogId}`, newBlogData, setAuthHeader())
        .then(response => response.data)
        .catch(err => rejectPromise(err))
}

export const deleteBlog = blogId => {
    return axiosInstance.delete(`/blogs/${blogId}`, setAuthHeader())
        .then(response => response.data)
}

// USER BLOGS
export const getUserBlogs = (req) => {
    return axiosInstance.get('/blogs/me', setAuthHeader(req))
        .then(response => response.data)
}