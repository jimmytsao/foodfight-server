'use strict';

var morgan      = require('morgan');
var bodyParser  = require('body-parser');

module.exports = middlewareConfig;

function middlewareConfig (app, express) {

  var authRouters = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/auth', authRouters); 
  // app.use(express.static(__dirname + '/../../client/ionic/www'));

  require('../modules/auth/authHandling.js')(authRouters, express);
}