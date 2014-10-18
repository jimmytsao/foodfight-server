'use strict';

if (!process.env.isDeployed){
  var fbConstants = require('../../../config/devConstants.js').fbConstants;
}

module.exports = {
  loginUrl:               process.env.loginUrl              || fbConstants.loginUrl,
  clientId:               process.env.fbClientId            || fbConstants.clientId,
  redirectUrlCordova:     process.env.redirectUrlCordova    || fbConstants.redirectUrlCordova, 
  redirectUrlNonCordova:  process.env.redirectUrlNonCordova || fbConstants.redirectUrlNonCordova, 
  clientSecret:           process.env.fbClientSecret        || fbConstants.clientSecret,
  tokenUrl:               process.env.tokenUrl              || fbConstants.tokenUrl
};
