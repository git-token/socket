'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* babel-plugin-inline-import './get_contract.sql' */var get_contract = 'SELECT * FROM gittoken_contracts ORDER BY date_deployed DESC LIMIT 1\n';
/* babel-plugin-inline-import './get_registered.sql' */var get_registered = 'SELECT * FROM registry;\n';


var queryString = {
  get_contract: get_contract,
  get_registered: get_registered
};

exports.default = queryString;