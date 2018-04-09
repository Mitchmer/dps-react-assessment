import { combineReducers } from 'redux'
import flash from './flash'
import beers from './beers'
import breweries from './breweries'
import totalpages from './totalpages'
import totalbeerpages from './totalbeerpages'
import beer from './beer'

const rootReducer = combineReducers({
  flash,
  beer,
  beers,
  breweries,
  totalpages,
  totalbeerpages,
})

export default rootReducer
