import {
  BREWERY
} from '../actions/breweries'

export const brewery = ( state = {}, action ) => {
  switch (action.type) {
    case BREWERY:
      return action.brewery
    default:
      return state
  }
}

export default brewery