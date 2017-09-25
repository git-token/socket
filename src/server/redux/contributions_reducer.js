const INITIAL_STATE = {
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
}

export default function reducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'WATCH_TOKEN':
      return {
        ...state,
        organizations: {
          ...state['organizations'],
          [action.org]: {
            ...state['organizations'][action.org],
            [action.event]: {
              ...state['organizations'][action.org][action.event],
              [action.id]: action.data
            }
          }
        }
      }
      break;
    default:
      return state
  }
}
