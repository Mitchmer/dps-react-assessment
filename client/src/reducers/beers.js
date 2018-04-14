import {
  BEERS,
} from '../actions/beers'

export const beers = ( state = [], action ) => {
  switch (action.type) {
    case BEERS:
      let uniqueBeers = (state) => {
        return [...new Set(state)]
      }
      let newArr = uniqueBeers(state)
      return [
        ...newArr,
        ...action.beers
      ]
    default:
      return state
  }
}

export default beers