import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
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

    getJWKS = async () => {
        const res = await axios.get('https://phungnv.auth0.com/.well-known/jwks.json');
        const jwks = res.data;
        return jwks;
    }

    verifyToken = async (token) => {
        if (token) {
            // complete = true -> to be able to access header in token
            const decodedToken = jwt.decode(token, { complete: true });
            if (!decodedToken) { return undefined; }
            const jwks = await this.getJWKS();
            const jwk = jwks.keys[0];
            // Build Certificate
            let cert = jwk.x5c[0];
            // devide into an array of 64-character strings. Then join then with a new line
            cert = cert.match(/.{1,64}/g).join('\n');
            cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`

            if (jwk.kid === decodedToken.header.kid) {
                try {
                    const verifiedToken = jwt.verify(token, cert);
                    const expiresAt = verifiedToken.exp * 1000; //miliseconds to seconds
                    return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
                } catch (err) {
                    return undefined;
                }
            }
        }
    }

    clientAuth = async () => {
        const token = Cookies.getJSON('jwt');
        const verifiedToken = await this.verifyToken(token);
        return verifiedToken;
    }

    serverAuth = async (req) => {
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