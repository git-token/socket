const INITIAL_STATE = {
  organizations: {
    'git-token': {
      Contribution: {},
    }
  }
}

export default function reducer(state=INITIAL_STATE, action) {
  const { org, id, data, type } = action
  switch(type != null && org != null && id != null) {
    case true:
      return {
        ...state,
        organizations: {
          ...state['organizations'],
          [org]: {
            ...state['organizations'][org],
            [type]: {
              ...state['organizations'][org][type],
              [id]: data
            }
          }
        }
      }
      break;
    default:
      return state
  }
}
