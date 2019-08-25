const express = require('express');
const next = require('next');
const routes = require('../routes');

// SERVICE
const authService = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const protectedDate = [
    {
        title: '123',
        description: '456'
    },
    {
        title: '123123',
        description: '456456'
    }
]

app.prepare()
    .then(() => {
        const server = express();

        server.get('/api/v1/protected', authService.checkJWT, (req, res) => {
            return res.json(protectedDate)
        })

        server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
            return res.json(protectedDate)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send({ title: 'Unauthorized', detail: 'Unauthorized Access' });
            }
        });

        server.use(handle).listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
