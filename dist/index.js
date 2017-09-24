'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _index = require('gittoken-event-listener/dist/client/index');

var _index2 = _interopRequireDefault(_index);

var _handleMsg = require('./handleMsg');

var _handleMsg2 = _interopRequireDefault(_handleMsg);

var _proxyQuery = require('./proxyQuery');

var _proxyQuery2 = _interopRequireDefault(_proxyQuery);

var _queryString = require('./queryString');

var _queryString2 = _interopRequireDefault(_queryString);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenSocketServer = function (_GitTokenEventWatcher) {
  (0, _inherits3.default)(GitTokenSocketServer, _GitTokenEventWatcher);

  function GitTokenSocketServer(_ref) {
    var socketPort = _ref.socketPort,
        mysqlHost = _ref.mysqlHost,
        mysqlUser = _ref.mysqlUser,
        mysqlRootPassword = _ref.mysqlRootPassword,
        mysqlDatabase = _ref.mysqlDatabase,
        watcherIpcPath = _ref.watcherIpcPath;
    (0, _classCallCheck3.default)(this, GitTokenSocketServer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GitTokenSocketServer.__proto__ || (0, _getPrototypeOf2.default)(GitTokenSocketServer)).call(this, { watcherIpcPath: watcherIpcPath }));

    _this.query = _query2.default.bind(_this);
    _this.handleMsg = _handleMsg2.default.bind(_this);
    _this.proxyQuery = _proxyQuery2.default.bind(_this);

    _this.queryString = _queryString2.default;

    // Instantiate MySql Connection
    _this.mysql = _mysql2.default.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlRootPassword,
      database: mysqlDatabase
    });

    _this.server = new _ws2.default.Server({ port: socketPort }, function () {
      console.log('GitToken Socket Server Started on Port: ', socketPort);

      // Listen for contract event listener messages
      _this.socket.on('data', function (msg) {

        console.log('Incoming Message from Event Listener', JSON.parse(msg.toString('utf8')));
      });
    });

    _this.server.on('connection', function (socket, req) {
      socket.on('message', function (message) {
        _this.handleMsg({ socket: socket, message: message });
      });
    });

    return _this;
  }

  return GitTokenSocketServer;
}(_index2.default);

exports.default = GitTokenSocketServer;