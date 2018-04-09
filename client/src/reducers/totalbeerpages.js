import {
  TOTAL_BEER_PAGES
} from '../actions/beers'

export const totalbeerpages = ( state = [], action ) => {
  switch (action.type) {
    case TOTAL_BEER_PAGES:
      return action.totalbeerpages
    default:
      return state
  }
}

export default totalbeerpages