import {
  BREWERIES,
} from '../actions/breweries'

export const breweries = ( state = [], action ) => {
  switch (action.type) {
    case BREWERIES:
      return action.breweries
    // case LOAD_MORE_BREWERIES:
    //   return action.breweries
    default:
      return state
  }
}

export default breweries