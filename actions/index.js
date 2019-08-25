import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils'

const setAuthHeader = (req) => {
    const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } }
    }
    return undefined;
}

export const getProtectedData = async (req) => {
    const url = 'http://localhost:3000/api/v1/protected';
    return await axios.get(url, setAuthHeader(req)).then(response => response.data)
}
