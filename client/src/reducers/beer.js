import {
  BEER
} from '../actions/beers'

export const beer = ( state = {}, action ) => {
  switch (action.type) {
    case BEER:
      return action.beer
    default:
      return state
  }
}

export default beer