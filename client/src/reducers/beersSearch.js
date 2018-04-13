import {
  BEERS_SEARCH,
  CLEAR_BEERS_SEARCH,
} from '../actions/beers'

export const beersSearch = ( state = [], action ) => {
  switch (action.type) {
    case BEERS_SEARCH:
      let uniqueBeers = (state) => {
        return [...new Set(state)]
      }
      let newArr = uniqueBeers(state)
      return [
        ...newArr,
        ...action.beersSearch
      ]
    case CLEAR_BEERS_SEARCH:
      return action.beersSearch
    default:
      return state
  }
}

export default beersSearch