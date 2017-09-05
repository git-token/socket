'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _handleMsg = require('./handleMsg');

var _handleMsg2 = _interopRequireDefault(_handleMsg);

var _proxyQuery = require('./proxyQuery');

var _proxyQuery2 = _interopRequireDefault(_proxyQuery);

var _queryString = require('./queryString');

var _queryString2 = _interopRequireDefault(_queryString);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenSocketServer = function GitTokenSocketServer(_ref) {
  var _this = this;

  var socketPort = _ref.socketPort,
      mysqlHost = _ref.mysqlHost,
      mysqlUser = _ref.mysqlUser,
      mysqlRootPassword = _ref.mysqlRootPassword,
      mysqlDatabase = _ref.mysqlDatabase;
  (0, _classCallCheck3.default)(this, GitTokenSocketServer);


  this.query = _query2.default.bind(this);
  this.handleMsg = _handleMsg2.default.bind(this);
  this.proxyQuery = _proxyQuery2.default.bind(this);

  this.queryString = _queryString2.default;

  // Instantiate MySql Connection
  this.mysql = _mysql2.default.createConnection({
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlRootPassword,
    database: mysqlDatabase
  });

  this.server = new _ws2.default.Server({ port: socketPort }, function () {
    console.log('GitToken Socket Server Started on Port: ', socketPort);
  });

  this.server.on('connection', function (socket, req) {
    socket.on('message', function (message) {
      _this.handleMsg({ socket: socket, message: message });
    });
  });
};

exports.default = GitTokenSocketServer;