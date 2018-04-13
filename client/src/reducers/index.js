import beer from './beer'
import beers from './beers'
import beerpage from './beerpage'
import beerSearchPage from './beerSearchPage'
import brewery from './brewery'
import breweries from './breweries'
import brewerypage from './brewerypage'
import flash from './flash'
import beersSearch from './beersSearch'
import totalbeerpages from './totalbeerpages'
import totalpages from './totalpages'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  flash,
  beer,
  beers,
  beerpage,
  beerSearchPage,
  brewery,
  breweries,
  brewerypage,
  beersSearch,
  totalpages,
  totalbeerpages,
})

export default rootReducer
