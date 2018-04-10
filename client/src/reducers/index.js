import { combineReducers } from 'redux'
import flash from './flash'
import beers from './beers'
import breweries from './breweries'
import totalpages from './totalpages'
import totalbeerpages from './totalbeerpages'
import beer from './beer'
import beerpage from './beerpage'
import brewerypage from './brewerypage'

const rootReducer = combineReducers({
  flash,
  beer,
  beerpage,
  beers,
  breweries,
  brewerypage,
  totalpages,
  totalbeerpages,
})

export default rootReducer
