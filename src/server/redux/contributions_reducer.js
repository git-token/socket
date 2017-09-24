const INITIAL_STATE = {
  organizations: {
    Contribution: {}
  }
}

function updateContributions(state, action) {
  const { org, id, data } = action
  return {
    ...state,
    organizations: {
      ...state['organizations'],
      Contribution: {
        ...state['organizations']['Contribution'],
        [org]: {
          ...state['organizations']['Contribution'][org],
          [id]: data
        }
      }
    }
  }
}

export default function reducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'Contribution':
      return updateContributions(state, action)
      break;
    default:
      return state
  }
}
