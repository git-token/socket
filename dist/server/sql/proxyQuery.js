'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = proxyQuery;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function proxyQuery(_ref) {
  var type = _ref.type,
      socket = _ref.socket,
      queryString = _ref.queryString;

  this.query({ queryString: queryString }).then(function (result) {
    socket.send((0, _stringify2.default)({ type: type, result: result }));
  }).catch(function (error) {
    socket.send((0, _stringify2.default)({ type: 'error', result: error.message }));
  });
}