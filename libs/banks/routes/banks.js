var express = require('express');
var router = express.Router();

module.exports = function(controller){

  /* POST users data. */
  router.post('/', controller.getBankData);
  router.get('/tool', controller.getToolBankData);

  return router;

};