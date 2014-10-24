'use strict';

var fbConstants = require('./fbConstants');
var loginUrlWithParameters = [
  fbConstants.loginUrl,
  '?client_id=',
  ,fbConstants.clientId,
  '&display=popup',
  '&redirect_uri='].join('');

module.exports = {
  cordova: cordovaRedirect,
  nonCordova: nonCordovaRedirect
};

function cordovaRedirect(request, response){
  var fullCordovaRedirectUrl = [loginUrlWithParameters, fbConstants.redirectUrlCordova].join('');
  response.redirect(fullCordovaRedirectUrl);
}

function nonCordovaRedirect(request, response){
  var fullNonCordovaRedirectUrl = [loginUrlWithParameters, fbConstants.redirectUrlNonCordova].join('');
  response.redirect(fullNonCordovaRedirectUrl);
}
