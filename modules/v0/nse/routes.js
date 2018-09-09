'use strict';

const express = require('express');
const router = express.Router();
const init = require('./init.js');
const crud = require('./crud.js');
const queries = require('./queries.js');

router.post('/init', init.init);

router.post('/requirements', crud.initiateRequirements);

router.post('/invoiceRequests', crud.initiateInvoiceRequest);
router.post('/invoiceRequests/approve', crud.approveInvoiceRequest);

router.post('/proposal', crud.initiateProposal);
router.post('/proposal/vendor/approve', crud.vendorApprovesProposal);
router.post('/proposal/corporation/approve', crud.corporationApprovesProposal);

router.get('/requirements', queries.getAllRequirements);
router.get('/proposals', queries.getAllRequirements);
router.get('/invoiceRequests', queries.getAllInvoicesRequests);

module.exports = router;
