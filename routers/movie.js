const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')


// INDEX
router.get('/', movieController.index);

module.exports = router;
