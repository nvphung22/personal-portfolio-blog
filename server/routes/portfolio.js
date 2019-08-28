const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../controllers/portfolio');
const authService = require('../services/auth');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.createPortfolio);

router.get('', portfolioCtrl.getPortfolios);

router.patch('/:id', portfolioCtrl.updatePortfolio);

router.delete('/:id', portfolioCtrl.deletePortfolio);


module.exports = router