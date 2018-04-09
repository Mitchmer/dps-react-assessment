import {
  TOTAL_PAGES
} from '../actions/breweries'

export const totalpages = ( state = [], action ) => {
  switch (action.type) {
    case TOTAL_PAGES:
      return action.totalpages
    default:
      return state
  }
}

export default totalpages