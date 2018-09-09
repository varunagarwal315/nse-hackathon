'use strict';

const express = require('express');
const router = express.Router();
const init = require('./init.js');
const crud = require('./crud.js');

router.post('/init', init.init);
router.post('/requirements', crud.initiateRequirements);
router.post('/invoice', crud.initiateInvoiceRequest);
router.post('/invoice/approve', crud.approveInvoiceRequest);
router.post('/proposal', crud.initiateProposal);
router.post('/proposal/vendor/approve', crud.vendorApprovesProposal);
router.post('/proposal/corporation/approve', crud.corporationApprovesProposal);

module.exports = router;l
