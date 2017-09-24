'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.default = reducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  organizations: {
    Contribution: {}
  }
};

function updateContributions(state, action) {
  var org = action.org,
      id = action.id,
      data = action.data;

  return (0, _extends5.default)({}, state, {
    organizations: (0, _extends5.default)({}, state['organizations'], {
      Contribution: (0, _extends5.default)({}, state['organizations']['Contribution'], (0, _defineProperty3.default)({}, org, (0, _extends5.default)({}, state['organizations']['Contribution'][org], (0, _defineProperty3.default)({}, id, data))))
    })
  });
}

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case 'Contribution':
      return updateContributions(state, action);
      break;
    default:
      return state;
  }
}