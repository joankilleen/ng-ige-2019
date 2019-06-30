const BASE_URL = require('../config').BASE_URL;
const API_DELAY = 10;

let theNumber;
let clientMap;

initialze();
console.log(`Numberguess Controller: Guess the number -> send a POST to ${BASE_URL}/numberguess`);

exports.getStatus = (req, res) => {
  const context = getContext(req);

  if (context.latestGuess == theNumber) {
    status = 'SUCCESS';
  }
  else if (context.latestGuess > theNumber) {
    status = 'ABOVE';
  } else {
    status = 'BELOW';
  }

  const response = {
    status,
    guessCount: context.guessCount
  };
  setTimeout(() => res.status(200).send(response), API_DELAY);
};

exports.guessNumber = (req, res) => {
  const context = getContext(req);

  context.latestGuess = req.body.number;
  context.guessCount++;
  setTimeout(() => res.sendStatus(200), API_DELAY);
};

exports.reset = (req, res) => {
  initialze();
  res.sendStatus(200);
};

exports.getNumber = () => {
  return theNumber;
};

function initialze() {
  theNumber = generateRandomNumber();

  clientMap = new Map();

  clientMap.set('global', {
    latestGuess: 0,
    guessCount: 0
  });

  return clientMap;
}

function getContext(req) {
  const clientId = req.query.clientId;
  console.log('Requested client-id: ', clientId);
  if (clientId) {
    const clientContext = clientMap.get(clientId);
    if (clientContext) {
      return clientContext;
    }
    else {
      const newClientContext = {
        latestGuess: 0,
        guessCount: 0
      };
      clientMap.set(clientId, newClientContext);
      return newClientContext;
    }
  } else {
    return clientMap.get('global');
  }
}

function generateRandomNumber() {
  const theNumber = Math.floor(Math.random() * 100) + 1;
  console.log(`
  ***********
  THE NUMBER IS: ${theNumber}
  ***********
  `);

  return theNumber;
}
