var express = require('express');
var router = express.Router();

module.exports = function(controller){

  /* POST users data. */
  router.get('/', controller.getPatterns);
  router.post('/addPattern', controller.addPattern);
  router.post('/addFillValue', controller.addFillValue);

  return router;

};
