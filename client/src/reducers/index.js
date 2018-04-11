import beer from './beer'
import beerpage from './beerpage'
import beers from './beers'
import brewery from './brewery'
import breweries from './breweries'
import brewerypage from './brewerypage'
import flash from './flash'
import totalbeerpages from './totalbeerpages'
import totalpages from './totalpages'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  flash,
  beer,
  beerpage,
  beers,
  brewery,
  breweries,
  brewerypage,
  totalpages,
  totalbeerpages,
})

export default rootReducer
