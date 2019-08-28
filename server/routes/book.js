const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');

router.post('', bookCtrl.createBook);

router.get('', bookCtrl.getBooks);

router.patch('/:id', bookCtrl.updateBook);

router.delete('/:id', bookCtrl.deleteBook);


module.exports = router