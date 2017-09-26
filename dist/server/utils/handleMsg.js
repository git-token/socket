'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleMsg;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _split = require('split');

var _split2 = _interopRequireDefault(_split);

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

			var orgData = this.store.getState()['organizations'][organization];

			// Attempt to send cached data before watching the token
			if (orgData != null) {
				socket.send((0, _stringify2.default)({
					type: 'ORGANIZATION_DATA',
					org: organization,
					data: orgData
				}));
			} else {
				this.contractEventListener.write(message);
			}

			this.contractEventListener.pipe((0, _split2.default)(JSON.parse)).on('data', function (msg) {
				try {
					if (organization == msg['data']['organization'] && socket.readyState === _ws2.default.OPEN) {
						socket.send((0, _stringify2.default)({
							type: 'WATCH_TOKEN',
							event: msg['event'],
							org: msg['data']['organization'],
							id: msg['data']['transactionHash'],
							data: msg
						}));
					}
				} catch (error) {
					console.error(error);
					console.log('msg', msg);
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