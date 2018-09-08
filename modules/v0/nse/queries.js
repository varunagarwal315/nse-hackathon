'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const ASSET_NS = 'com.algorythmix.assets';
const PARTICIPANT_NS = 'com.algorythmix.participants';
const adminCard = 'admin@nse-hackathon';

const getAllRequirements = (req, res) => {
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
