'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleMsg;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleMsg(_ref) {
	var socket = _ref.socket,
	    message = _ref.message;

	var _JSON$parse = JSON.parse(message),
	    type = _JSON$parse.type,
	    data = _JSON$parse.data;

	switch (type.toUpperCase()) {
		case 'WATCH_TOKEN':
			var organization = data.organization;

			this.contractEventListener.write(message);
			this.contractEventListener.on('data', function (_msg) {
				var msg = JSON.parse(_msg.toString('utf8'));
				if (organization == msg['data']['organization'] && socket.readyState === _ws2.default.OPEN) {
					socket.send((0, _stringify2.default)({
						type: 'WATCH_TOKEN',
						event: msg['event'],
						org: msg['data']['organization'],
						id: msg['data']['transactionHash'],
						data: msg
					}));
				}
			});
			break;
		case 'GET_REGISTERED':
			this.proxyQuery({
				queryString: this.queryString[type],
				type: type,
				socket: socket
			});
			break;
		default:
			socket.send((0, _stringify2.default)({
				type: 'error',
				result: event + ' is an invalid event.'
			}));
			return null;
	}
}