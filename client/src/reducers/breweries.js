import {
  BREWERIES,
} from '../actions/breweries'

export const breweries = ( state = [], action ) => {
  switch (action.type) {
    case BREWERIES:
      let uniqueBreweries = (state) => {
        return [...new Set(state)]
      }
      let newArr = uniqueBreweries(state)
      return [
        ...newArr,
        ...action.breweries,
      ]
    default:
      return state
  }
}

export default breweries