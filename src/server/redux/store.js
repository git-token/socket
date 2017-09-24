import { createStore } from 'redux'
import contributions_reducer from './contributions_reducer'

const store = createStore(contributions_reducer)

export default store
