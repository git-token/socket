'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _contributions_reducer = require('./contributions_reducer');

var _contributions_reducer2 = _interopRequireDefault(_contributions_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_contributions_reducer2.default);

exports.default = store;