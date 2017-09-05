'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenSocketClient = function (_EventEmitter) {
  (0, _inherits3.default)(GitTokenSocketClient, _EventEmitter);

  function GitTokenSocketClient(_ref) {
    var socketUri = _ref.socketUri;
    (0, _classCallCheck3.default)(this, GitTokenSocketClient);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GitTokenSocketClient.__proto__ || (0, _getPrototypeOf2.default)(GitTokenSocketClient)).call(this));

    _this.socket = new _ws2.default(socketUri);
    _this.socket.on('open', function () {
      console.log('Connected to GitToken Socket Server');
      _this.emit('connect');
    });

    _this.socket.on('message', function (msg) {
      _this.emit('data', msg);
    });

    _this.socket.on('close', function () {
      console.log('Connection to GitToken Socket Closed');
    });
    return _this;
  }

  (0, _createClass3.default)(GitTokenSocketClient, [{
    key: 'getContract',
    value: function getContract() {
      this.socket.send((0, _stringify2.default)({ event: 'get_contract' }));
    }
  }]);
  return GitTokenSocketClient;
}(_events2.default);

exports.default = GitTokenSocketClient;