'use strict';


module.exports = function (router, express) {
  var fbRouter = express.Router();

  router.use('/fb', fbRouter);
  require('./fb/fbHandlers')(fbRouter);


  router.route('/*', function(req, res){
    res.status(404).end();
  });  
};
