'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

exports.default = reducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  organizations: {
    'git-token': {
      Contribution: {}
    }
  }
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];
  var org = action.org,
      id = action.id,
      data = action.data,
      type = action.type;

  switch (type != null && org != null && id != null) {
    case true:
      return (0, _extends6.default)({}, state, {
        organizations: (0, _extends6.default)({}, state['organizations'], (0, _defineProperty3.default)({}, org, (0, _extends6.default)({}, state['organizations'][org], (0, _defineProperty3.default)({}, type, (0, _extends6.default)({}, state['organizations'][org][type], (0, _defineProperty3.default)({}, id, data))))))
      });
      break;
    default:
      return state;
  }
}