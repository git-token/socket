'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* babel-plugin-inline-import '../sql/get_contract.sql' */var get_contract = 'SELECT * FROM gittoken_contracts ORDER BY date_deployed DESC LIMIT 1\n';


var queryString = {
  get_contract: get_contract
};

exports.default = queryString;