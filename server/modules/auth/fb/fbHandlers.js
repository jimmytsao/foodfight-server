'use strict';

var fbLoginRedirects = require('./fbLoginRedirects.js');

module.exports = fbRouting;

function fbRouting(router){
  router
    .route('/login/noncordova')
    .get(fbLoginRedirects.nonCordova);

  router
    .route('/login/cordova')
    .get(fbLoginRedirects.cordova);
}
