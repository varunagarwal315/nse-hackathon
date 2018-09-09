# Algorythmix - NSE Future Tech 2018


## Scope
- Tokenization of assets to enable vendor financing
- World view for vendors-corporations-financers


## Solution


## Architecture


## Deployment steps
- `cd chaincode`

composer archive create -t dir -n .
composer network install -c PeerAdmin@fabric-network -a nse-hackathon@4.0.0.bna
composer network start --networkName nse-hackathon --networkVersion 4.0.0 -A admin -S adminpw -c PeerAdmin@fabric-network
composer card import -f admin@nse-hackathon.card
composer network ping -c admin@nse-hackathon

- Don't forget to check the network version with that in `/chaincode/package.json`

## Safe restart
-`cd ~/fabric-dev-servers/hlfv11`
-`docker-compose stop`
-`docker-compose start`


## Upgrade chain code
- `cd chaincode`
- `composer archive create -t dir -n .``
- `composer network install -c PeerAdmin@fabric-network -a nse-hackathon@1.0.0.bna`
- `composer network upgrade --networkName nse-hackathon --networkVersion NEW_VERSION -c PeerAdmin@fabric-network`
- Don't forget to clear the docker image for the previous version


## Testing
- `npm test`
- `npm start`
- `localhost:8000`


## Engines used
- Node.js framework
- Hyperledger Fabric `v1.1`
- Composer `0.19.11`
