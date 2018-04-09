import { combineReducers } from 'redux'
import flash from './flash'
import beers from './beers'
import breweries from './breweries'
import totalpages from './totalpages'
import totalbeerpages from './totalbeerpages'

const rootReducer = combineReducers({
  flash,
  beers,
  breweries,
  totalpages,
  totalbeerpages,
})

export default rootReducer
