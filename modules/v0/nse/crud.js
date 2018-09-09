'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const ASSET_NS = 'com.algorythmix.assets';
const PARTICIPANT_NS = 'com.algorythmix.participants';
const adminCard = 'admin@nse-hackathon';
const financerCard = 'financer@nse-hackathon';
const vendorCard = 'vendor@nse-hackathon';
const corporationCard = 'corporation@nse-hackathon';


const initiateRequirements = (req, res) => {
  const businessNetworkConnection = new BusinessNetworkConnection();
  try {
    await businessNetworkConnection.connect(corporationCard);
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    let tx = factory.newTransaction(ASSET_NS, 'InitiateRequirements');
    tx.id = req.body.id;
    tx.corporationId = req.body.corporationId;
    tx.description = req.body.description;
    tx.vendorId = req.body.vendorId;

    await businessNetworkConnection.submitTransaction(tx);
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      message: 'Requirement for goods/ services has been created',
      devMessage: 'Success'
    });
  } catch (e) {
    res.json({
      devMessage: 'Critical error',
      error: {
        message: e.message
      }
    });
  };
};


const initiateInvoiceRequest = (req, res) => {
  const businessNetworkConnection = new BusinessNetworkConnection();
  try {
    await businessNetworkConnection.connect(vendorCard);
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    let tx = factory.newTransaction(ASSET_NS, 'InitiateInvoiceRequest');
    tx.id = req.body.id;
    tx.amountRequested = req.body.amountRequested;
    tx.corporationId = req.body.corporationId;
    tx.invoiceId = req.body.invoiceId;
    tx.paymentDate = req.body.paymentDate;
    tx.requirementsId = req.body.requirementsId;
    await businessNetworkConnection.submitTransaction(tx);

    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      message: 'Your invoice has been raised. Please wait for approval.',
      devMessage: 'Success'
    });
  } catch (e) {
    res.json({
      devMessage: 'Critical error',
      error: {
        message: e.message
      }
    });
  };
};


const approveInvoiceRequest = (req, res) => {
  const businessNetworkConnection = new BusinessNetworkConnection();
  try {
    await businessNetworkConnection.connect(corporationCard);
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    let tx = factory.newTransaction(ASSET_NS, 'ApproveInvoiceRequest');
    tx.invoiceRequestId = req.body.invoiceRequestId;

    await businessNetworkConnection.submitTransaction(tx);
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      message: 'The invoice has been approved',
      devMessage: 'Success'
    });
  } catch (e) {
    devMessage: 'Critical error',
    error: {
      message: e.message
    }
  };
};

const initiateProposal = (req, res) => {
  const businessNetworkConnection = new BusinessNetworkConnection();
  try {
    await businessNetworkConnection.connect(financerCard);
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    let tx = factory.newTransaction(ASSET_NS, 'InitiateProposal');
    tx.invoiceRequestId = req.body.invoiceRequestId;
    tx.invoiceId = req.body.invoiceId;
    tx.corporationId = req.body.corporationId;
    tx.amount = req.body.amount;
    tx.numberOfDays = req.body.numberOfDays;
    await businessNetworkConnection.submitTransaction(tx);

    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      message: 'The invoice has been approved',
      devMessage: 'Success'
    });
  } catch (e) {
    devMessage: 'Critical error',
    error: {
      message: e.message
    }
  };
};

const vendorApprovesProposal = (req, res) => {
  const businessNetworkConnection = new BusinessNetworkConnection();
  try {
    await businessNetworkConnection.connect(vendorCard);
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    let tx = factory.newTransaction(ASSET_NS, 'VendorApprovesProposal');
    tx.approve = req.body.approve;
    tx.proposalId = req.body.proposalId;

    await businessNetworkConnection.submitTransaction(tx);
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      message: 'The invoice has been approved',
      devMessage: 'Success'
    });
  } catch (e) {
    devMessage: 'Critical error',
    error: {
      message: e.message
    }
  };
};

const corporationApprovesProposal = (req, res) => {
  const businessNetworkConnection = new BusinessNetworkConnection();
  try {
    await businessNetworkConnection.connect(corporationCard);
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    let tx = factory.newTransaction(ASSET_NS, 'CorporationApprovesProposal');
    tx.approve = req.body.approve;
    tx.proposalId = req.body.proposalId;

    await businessNetworkConnection.submitTransaction(tx);
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      message: 'The invoice has been approved',
      devMessage: 'Success'
    });
  } catch (e) {
    devMessage: 'Critical error',
    error: {
      message: e.message
    }
  };
};

module.exports = {
  initiateRequirements,
  initiateInvoiceRequest,
  approveInvoiceRequest,
  initiateProposal,
  vendorApprovesProposal,
  corporationApprovesProposal
};
