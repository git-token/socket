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

var _index3 = require('./utils/index');

var _index4 = require('./sql/index');

var _index5 = require('./redux/index');

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

    _this.query = _index4.query.bind(_this);
    _this.handleMsg = _index3.handleMsg.bind(_this);
    _this.proxyQuery = _index4.proxyQuery.bind(_this);

    _this.queryString = _index4.queryString;
    _this.store = _index5.store;

    // this.unsubscribe = this.store.subscribe(() => {
    //   console.log('store', JSON.stringify(this.store.getState(), null, 2))
    // })

    // Instantiate MySql Connection
    _this.mysql = _mysql2.default.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlRootPassword,
      database: mysqlDatabase
    });

    _this.server = new _ws2.default.Server({ port: socketPort }, function () {
      console.log('GitToken Socket Server Started on Port: ', socketPort);

      // Listen for contract event listener messages;
      _this.contractEventListener.on('data', function (_msg) {
        console.log('_msg', _msg);
        var msg = JSON.parse(_msg.toString('utf8'));
        // console.log('msg', msg)
        _this.store.dispatch({
          type: 'WATCH_TOKEN',
          event: msg['event'],
          org: msg['data']['organization'],
          id: msg['data']['transactionHash'],
          data: msg
        });
      });

      var unsubscribe = _this.store.subscribe(function () {
        console.log('State: ', (0, _stringify2.default)(_this.store.getState(), null, 2));
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