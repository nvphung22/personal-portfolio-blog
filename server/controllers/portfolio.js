const Portfolio = require('../models/portfolio');

exports.getPortfolios = (req, res) => {
    Portfolio.find()
        .sort({ 'startDate': -1 })
        .exec((err, allPortfolios) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(allPortfolios);
        })
}

// exports.getPortfolioById = (req, res) => {
//     const portfolioId = req.params.id;
//     Portfolio.findById(portfolioId, (err, portfolio) => {
//         if (err) {
//             return res.status(422).send(err);
//         }
//         return res.json(portfolio);
//     })
// }

exports.getPortfolioById = (req, res) => {
    const portfolioId = req.params.id;
    Portfolio.findById(portfolioId)
        .select('-__v')
        .exec((err, portfolio) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(portfolio);
        });
}

exports.createPortfolio = (req, res) => {
    const portfolioData = req.body;
    const portfolio = new Portfolio(portfolioData);
    const userId = req.user && req.user.sub;
    portfolio.userId = userId;
    portfolio.save((err, createdPortfolio) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(createdPortfolio);
    })
}

exports.updatePortfolio = (req, res) => {
    const portfolioId = req.params.id;
    const portfolioData = req.body;
    Portfolio.findById(portfolioId, (err, foundPortfolio) => {
        if (err) {
            res.status(422).send(err);
        }

        foundPortfolio.set(portfolioData);
        foundPortfolio.save((err, savedPortfolio) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(savedPortfolio);
        })
    })
}

exports.deletePortfolio = (req, res) => {
    const portfolioId = req.params.id;
    Portfolio.deleteOne({ _id: portfolioId }, (err, deletedPortfolio) => {
        if (err) {
            res.status(422).send(err);
        }

        return res.json({
            status: 'DELETED'
        });
    })
}