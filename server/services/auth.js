const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: 'https://phungnv.auth0.com/.well-known/jwks.json'
    }),
    audience: 'B10LNJYgqmnCkpbvYw2JnQXG4Ej6IFYl',
    issuer: 'https://phungnv.auth0.com/',
    algorithms: ['RS256']
})