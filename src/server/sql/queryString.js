import get_contract from './get_contract.sql'
import get_registered from './get_registered.sql'

const queryString = {
  get_contract: get_contract,
  get_registered: get_registered
}

export default queryString
