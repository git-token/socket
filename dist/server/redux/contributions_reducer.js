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
      summaryDetails: {},
      contributionHistory: [],
      leaderBoard: [],
      contributionFrequency: [],
      supplyGrowth: [],
      milestones: [],
      auctions: []
    }
  }
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case 'WATCH_TOKEN':
      return (0, _extends6.default)({}, state, {
        organizations: (0, _extends6.default)({}, state['organizations'], (0, _defineProperty3.default)({}, action.org, (0, _extends6.default)({}, state['organizations'][action.org], (0, _defineProperty3.default)({}, action.event, (0, _extends6.default)({}, state['organizations'][action.org][action.event], (0, _defineProperty3.default)({}, action.id, action.data))))))
      });
      break;
    default:
      return state;
  }
}