import { BREWERY_PAGE } from '../actions/breweries'

export const brewerypage = (state = 1, action) => {
  switch (action.type) {
    case BREWERY_PAGE:
      return action.brewerypage
    default:
      return state
  }
}

export default brewerypage