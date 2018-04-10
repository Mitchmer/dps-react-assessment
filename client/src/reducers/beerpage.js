import { BEER_PAGE } from '../actions/beers'

export const beerpage = (state = 1, action) => {
  switch (action.type) {
    case BEER_PAGE:
      return action.beerpage
    default:
      return state
  }
}

export default beerpage