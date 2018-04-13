import { BEER_SEARCH_PAGE } from '../actions/beers'

export const beerSearchPage = (state = 1, action) => {
  switch (action.type) {
    case BEER_SEARCH_PAGE:
      return action.beerSearchPage
    default:
      return state
  }
}

export default beerSearchPage