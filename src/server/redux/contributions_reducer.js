const INITIAL_STATE = {
  organizations: {}
}

export default function reducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'WATCH_TOKEN':

      state['organizations'][action.org] =
        !state['organizations'][action.org] ? {} :
        state['organizations'][action.org]

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
