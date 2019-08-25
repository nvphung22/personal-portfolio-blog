import axios from 'axios';
import Cookies from 'js-cookie';

const setAuthHeader = () => {
    const token = Cookies.getJSON('jwt');
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } }
    }
}

export const getProtectedData = async () => {
    return await axios.get('/api/v1/protected', setAuthHeader())
        .then(response => response.data)
}
