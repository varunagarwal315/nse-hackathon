'use strict';

const express = require('express');
const router = express.Router();
const init = require('./init.js');

router.post('/init', init.init);

module.exports = router;
