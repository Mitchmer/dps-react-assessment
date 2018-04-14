import {
  BREWERIES_SEARCH,
  CLEAR_BREWERIES_SEARCH,
} from '../actions/breweries'

export const breweriesSearch = ( state =[], action ) => {
  switch (action.type) {
    case BREWERIES_SEARCH:
      let uniqueBreweries = (state) => {
        return [...new Set(state)]
      }
      let newArr = uniqueBreweries(state)
      return [
        ...newArr,
        ...action.breweriesSearch
      ]
    case CLEAR_BREWERIES_SEARCH:
      return action.breweriesSearch
    default:
      return state
  }
}

export default breweriesSearch