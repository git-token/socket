'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleMsg;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleMsg(_ref) {
	var socket = _ref.socket,
	    message = _ref.message;

	var _JSON$parse = JSON.parse(message),
	    event = _JSON$parse.event;

	var queryString = this.queryString[event];

	if (!queryString) {
		socket.send((0, _stringify2.default)({
			event: 'error',
			message: event + ' is an invalid event.'
		}));
	} else {
		this.proxyQuery({ queryString: queryString, event: event, socket: socket });
	}
}