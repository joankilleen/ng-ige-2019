const express = require('express');
const router = express.Router();
const wordController = require('./controllers/wordController');
const numberGuessController = require('./controllers/numberGuessController');


router.get('/word/:index', wordController.getWord);

router.get('/numberguess', numberGuessController.getStatus);
router.post('/numberguess', numberGuessController.guessNumber);
router.post('/numberguess/reset', numberGuessController.reset);

module.exports = router;
