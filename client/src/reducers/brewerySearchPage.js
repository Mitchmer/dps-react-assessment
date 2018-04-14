import { 
  BREWERY_SEARCH_PAGE,
} from '../actions/breweries'

export const brewerySearchPage = (state = 1, action) => {
  switch (action.type) {
    case BREWERY_SEARCH_PAGE:
      return action.brewerySearchPage
    default:
      return state
  }
}

export default brewerySearchPage