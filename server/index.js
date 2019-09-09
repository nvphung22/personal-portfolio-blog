const express = require('express');
const path = require('path');
const next = require('next');
const routes = require('../routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
// SERVICE
const authService = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

// ROUTES
const bookRoutes = require('./routes/book');
const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog');

const PORT = process.env.PORT || 3000;

const robotsOptions = {
    root: path.join(__dirname, "../static"),
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
}

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

// or if you want to async...await to connect to DB, use this
// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app.prepare()
    .then(() => {
        const server = express();

        server.use(compression());

        server.use(bodyParser.json());

        server.use('/api/v1/books', bookRoutes);
        server.use('/api/v1/portfolios', portfolioRoutes);
        server.use('/api/v1/blogs', blogRoutes);

        server.get('/robots.txt', (req, res) => {
            return res.status(200).sendFile('robots.txt', robotsOptions);
        });

        //TESTING some routes
        server.get('/api/v1/protected', authService.checkJWT, (req, res) => {
            return res.json(protectedDate);
        })

        server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
            return res.json(protectedDate);
        })
        //-----------------------

        server.get('*', (req, res) => {
            return handle(req, res);
        })

        server.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send({ title: 'Unauthorized', detail: 'Unauthorized Access' });
            }
        });

        server.use(handle).listen(PORT, (err) => {
            if (err) throw err;
            console.log(`> Ready on ${PORT}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
