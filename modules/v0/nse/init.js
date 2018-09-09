'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const AdminConnection = require('composer-admin').AdminConnection;
const IdCard = require('composer-common').IdCard;
const PARTICIPANT_NS = 'com.algorythmix.participants';
const adminCardName = 'admin@nse-hackathon';
const connectionProfile = {"name":"fabric-network","x-type":"hlfv1","version":"1.0.0","peers":{"peer0.org1.example.com":{"url":"grpc://localhost:7051","eventUrl":"grpc://localhost:7053"}},"certificateAuthorities":{"ca.org1.example.com":{"url":"http://localhost:7054","caName":"ca.org1.example.com"}},"orderers":{"orderer.example.com":{"url":"grpc://localhost:7050"}},"organizations":{"Org1":{"mspid":"Org1MSP","peers":["peer0.org1.example.com"],"certificateAuthorities":["ca.org1.example.com"]}},"channels":{"composerchannel":{"orderers":["orderer.example.com"],"peers":{"peer0.org1.example.com":{"endorsingPeer":true,"chaincodeQuery":true,"eventSource":true}}}},"client":{"organization":"Org1","connection":{"timeout":{"peer":{"endorser":"300","eventHub":"300","eventReg":"300"},"orderer":"300"}}}};

const initParticipants = () => {
  return new Promise(async function(resolve, reject) {
    try {
      const businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(adminCardName);

      let vendorRegistry =  await businessNetworkConnection.getParticipantRegistry(`${PARTICIPANT_NS}.Vendor`);
      let corporationRegistry =  await businessNetworkConnection.getParticipantRegistry(`${PARTICIPANT_NS}.Corporation`);
      let financerRegistry =  await businessNetworkConnection.getParticipantRegistry(`${PARTICIPANT_NS}.Financer`);
      const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      let vendor = factory.newResource(PARTICIPANT_NS, 'Vendor', 'vendor1234');
      vendor.name = 'Varun Agarwal';
      vendor.creationDate = new Date();
      let addressOne = factory.newConcept(PARTICIPANT_NS, 'Address');
      addressOne.building = 'Building 101';
      addressOne.street = 'Street 101';
      addressOne.locality = 'Locality 101';
      addressOne.city = 'City 101';
      addressOne.pinCode = 'PIN#101';
      vendor.address = addressOne;
      vendor.pancard = 'PAN#VENDOR';

      let corporation = factory.newResource(PARTICIPANT_NS, 'Corporation', 'corporation1234');
      corporation.name = 'Utkarsh and Sons';
      corporation.creationDate = new Date();
      let addressTwo = factory.newConcept(PARTICIPANT_NS, 'Address');
      addressTwo.building = 'Building 102';
      addressTwo.street = 'Street 102';
      addressTwo.locality = 'Locality 102';
      addressTwo.city = 'City 102';
      addressTwo.pinCode = 'PIN#102';
      corporation.address = addressTwo;
      corporation.pancard = 'PAN#CORPORATION';

      let financer = factory.newResource(PARTICIPANT_NS, 'Financer', 'financer1234');
      financer.name = 'Juzer ventures';
      financer.creationDate = new Date();
      corporation.creationDate = new Date();
      let addressThree = factory.newConcept(PARTICIPANT_NS, 'Address');
      addressThree.building = 'Building 103';
      addressThree.street = 'Street 103';
      addressThree.locality = 'Locality 103';
      addressThree.city = 'City 103';
      addressThree.pinCode = 'PIN#103';
      financer.address = addressThree;
      financer.pancard = 'PAN#FINANCER';

      await vendorRegistry.add(vendor);
      await corporationRegistry.add(corporation);
      await financerRegistry.add(financer);
      await businessNetworkConnection.disconnect();
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    };
  });
};


const initIdentities = () => {
  return new Promise(async function(resolve, reject) {
    try {
      const businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(adminCardName);

      let vendorRegistry =  await businessNetworkConnection.getParticipantRegistry(`${PARTICIPANT_NS}.Vendor`);
      let corporationRegistry =  await businessNetworkConnection.getParticipantRegistry(`${PARTICIPANT_NS}.Corporation`);
      let financerRegistry =  await businessNetworkConnection.getParticipantRegistry(`${PARTICIPANT_NS}.Financer`);
      const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      let vendor = await vendorRegistry.get('vendor1234');
      let corporation = await corporationRegistry.get('corporation1234');
      let financer = await financerRegistry.get('financer1234');

      let vendorID = await businessNetworkConnection.issueIdentity(`${PARTICIPANT_NS}.Vendor#vendor1234`, 'vendor1234');
      console.log(`userID = ${vendorID.userID}`);
      console.log(`userSecret = ${vendorID.userSecret}`);

      let corporationID = await businessNetworkConnection.issueIdentity(`${PARTICIPANT_NS}.Corporation#corporation1234`, 'corporation1234');
      console.log(`userID = ${corporationID.userID}`);
      console.log(`userSecret = ${corporationID.userSecret}`);

      let financerID = await businessNetworkConnection.issueIdentity(`${PARTICIPANT_NS}.Financer#financer1234`, 'financer1234');
      console.log(`userID = ${financerID.userID}`);
      console.log(`userSecret = ${financerID.userSecret}`);

      const adminConnection = new AdminConnection();
      await adminConnection.connect(adminCardName);
      console.log('connected');

      const cardOne = new IdCard({
        userName: 'vendor1234',
        version: 1,
        enrollmentSecret: vendorID.userSecret,
        businessNetwork: 'nse-hackathon'
      }, connectionProfile);

      const cardTwo = new IdCard({
        userName: 'corporation1234',
        version: 1,
        enrollmentSecret: corporationID.userSecret,
        businessNetwork: 'nse-hackathon'
      }, connectionProfile);

      const cardThree = new IdCard({
        userName: 'financer1234',
        version: 1,
        enrollmentSecret: financerID.userSecret,
        businessNetwork: 'nse-hackathon'
      }, connectionProfile);

      await adminConnection.importCard('vendor', cardOne);
      await adminConnection.importCard('corporation', cardTwo);
      await adminConnection.importCard('financer', cardThree);

      await businessNetworkConnection.disconnect();
      await adminConnection.disconnect();
      resolve();
    } catch (e) {
      reject(e);
    };
  });
};

const importCards = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const adminConnection = new AdminConnection();
      await adminConnection.connect(adminCardName);
      console.log('connected');

      const cardOne = new IdCard({
        userName: 'vendor1234',
        version: 1,
        enrollmentSecret: vendorID.userSecret,
        businessNetwork: 'nse-hackathon'
      }, connectionProfile);

      const cardTwo = new IdCard({
        userName: 'corporation1234',
        version: 1,
        enrollmentSecret: corporationID.userSecret,
        businessNetwork: 'nse-hackathon'
      }, connectionProfile);

      const cardThree = new IdCard({
        userName: 'financer1234',
        version: 1,
        enrollmentSecret: financerID.userSecret,
        businessNetwork: 'nse-hackathon'
      }, connectionProfile);

      await adminConnection.importCard('vendor@nse-hackathon', cardOne);
      await adminConnection.importCard('corporation@nse-hackathon', cardTwo);
      await adminConnection.importCard('financer@nse-hackathon', cardThree);

      await businessNetworkConnection.disconnect();
      await adminConnection.disconnect();
      resolve();
    } catch (e) {
      reject(e);
    };
  });
};

const pingNetwork = () => {
  return new Promise(async (resolve, reject) => {
    const businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect('vendor@nse-hackathon');
    await businessNetworkConnection.ping();
    console.log('Generated certificate for vendor');

    await businessNetworkConnection.disconnect();
    await businessNetworkConnection.connect('corporation@nse-hackathon');
    await businessNetworkConnection.ping();
    console.log('Generated certificate for corporation');

    await businessNetworkConnection.connect('financer@nse-hackathon');
    await businessNetworkConnection.ping();
    console.log('Generated certificate for financer');

    await businessNetworkConnection.disconnect();
    resolve();
  });
};


const init = async (req, res) => {
  try {
    await initParticipants();
    await initIdentities();
    await pingNetwork();
    res.json({message: 'DONE!!'})
  } catch (e) {
    console.log(e);
  };
};


module.exports = { init };
