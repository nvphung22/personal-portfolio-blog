import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'
class Auth0 {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'phungnv.auth0.com',
            clientID: 'B10LNJYgqmnCkpbvYw2JnQXG4Ej6IFYl',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile'
        });
    }

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.expiresIn) {
                    this.setSession(authResult);
                    resolve();
                } else if (err) {
                    reject(err);
                }
            })
        })
    }

    setSession = (authResult) => {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        Cookies.set('user', authResult.idTokenPayload);
        Cookies.set('jwt', authResult.idToken);
        Cookies.set('expiresAt', expiresAt);
    }

    login = () => {
        this.auth0.authorize();
    }

    logout = () => {
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');
        this.auth0.logout({
            returnTo: '', //Home
            clientID: 'B10LNJYgqmnCkpbvYw2JnQXG4Ej6IFYl'
        })
    }

    verifyToken = (token) => {
        if (token) {
            const decodedToken = jwt.decode(token);
            const expiresAt = decodedToken.exp * 1000; //miliseconds to seconds
            return (decodedToken && new Date().getTime() < expiresAt) ? decodedToken : undefined;
        }
    }

    clientAuth = () => {
        const token = Cookies.getJSON('jwt');
        const verifiedToken = this.verifyToken(token);
        return  verifiedToken;
    }

    serverAuth = (req) => {
        if (req.headers.cookie) {
            const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
            if (!tokenCookie) {
                return undefined; // or return false
            }

            const token = tokenCookie.split('=')[1];
            const verifiedToken = this.verifyToken(token);
            return verifiedToken;
        }
        return undefined;
    }
}

const auth0Client = new Auth0();

export default auth0Client;