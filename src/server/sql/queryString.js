import get_contract from './get_contract.sql'
import get_registered from './get_registered.sql'

const queryString = {
  GET_CONTRACT: get_contract,
  GET_REGISTERED: get_registered
}

export default queryString
