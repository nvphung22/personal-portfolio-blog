const express = require('express');
const next = require('next');
const routes = require('../routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// SERVICE
const authService = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config')

const bookRoute = require('./routes/book')

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

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("---------------DB connected!---------------")
    })
    .catch(err => {
        console.log(err);
    })

// if you want to async...await
async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());

        server.use('/api/v1/books', bookRoute);

        server.get('/api/v1/protected', authService.checkJWT, (req, res) => {
            return res.json(protectedDate);
        })

        server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
            return res.json(protectedDate);
        })

        server.get('*', (req, res) => {
            return handle(req, res);
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
