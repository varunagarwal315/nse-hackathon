'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const ASSET_NS = 'com.algorythmix.assets';
const PARTICIPANT_NS = 'com.algorythmix.participants';
const adminCard = 'admin@nse-hackathon';

const getAllRequirements = async (req, res) => {
  try {
    const businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(adminCard);
    const qry = businessNetworkConnection.buildQuery(`SELECT ${ASSET_NS}.Requirements`);
    let requirements = await businessNetworkConnection.query(qry, {});
    let serializedRequirements = [];
    for (var i = 0; i < requirements.length; i++) {
      serializedRequirements.push(businessNetworkConnection.getBusinessNetwork().getSerializer().toJSON(requirements[i]));
    };
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      baseUrl: req.baseUrl,
      requirements: serializedRequirements,
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

const getAllProposals = async (req, res) => {
  try {
    const businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(adminCard);
    const qry = businessNetworkConnection.buildQuery(`SELECT ${ASSET_NS}.Proposal`);
    let proposal = await businessNetworkConnection.query(qry, {});
    let serializedProposal = [];
    for (var i = 0; i < proposal.length; i++) {
      serializedProposal.push(businessNetworkConnection.getBusinessNetwork().getSerializer().toJSON(proposal[i]));
    };
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      baseUrl: req.baseUrl,
      proposal: serializedProposal,
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

const getAllInvoicesRequests = async (req, res) => {
  try {
    const businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(adminCard);
    const qry = businessNetworkConnection.buildQuery(`SELECT ${ASSET_NS}.InvoiceRequest`);
    let proposal = await businessNetworkConnection.query(qry, {});
    let serializedProposal = [];
    for (var i = 0; i < proposal.length; i++) {
      serializedProposal.push(businessNetworkConnection.getBusinessNetwork().getSerializer().toJSON(proposal[i]));
    };
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      baseUrl: req.baseUrl,
      invoiceRequest: serializedProposal,
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

const getSpecificInvoice = async (req, res) => {
  try {
    const businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(adminCard);
    let registry = await businessNetworkConnection.getParticipantRegistry(`${ASSET_NS}.InvoiceRequest`);
    let invoice = await registry.get(req.params.id);
    let serialized = businessNetworkConnection.getBusinessNetwork().getSerializer().toJSON(invoice);
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      baseUrl: req.baseUrl,
      invoiceRequest: serialized,
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

const getAllInvoiceDiscounts = async (req, res) => {
  try {
    const businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(adminCard);
    const qry = businessNetworkConnection.buildQuery(`SELECT ${ASSET_NS}.InvoiceDiscounting`);
    let proposal = await businessNetworkConnection.query(qry, {});
    let serializedProposal = [];
    for (var i = 0; i < proposal.length; i++) {
      serializedProposal.push(businessNetworkConnection.getBusinessNetwork().getSerializer().toJSON(proposal[i]));
    };
    await businessNetworkConnection.disconnect();
    res.json({
      timestamp: new Date(),
      baseUrl: req.baseUrl,
      invoiceDiscount: serializedProposal,
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

module.exports = {
  getAllRequirements,
  getAllProposals,
  getAllInvoicesRequests,
  getAllInvoiceDiscounts
};
