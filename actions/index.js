import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
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