import beer from './beer'
import beers from './beers'
import beerpage from './beerpage'
import beerSearchPage from './beerSearchPage'
import beersSearch from './beersSearch'
import brewery from './brewery'
import breweries from './breweries'
import brewerypage from './brewerypage'
import brewerySearchPage from './brewerySearchPage'
import breweriesSearch from './breweriesSearch'
import flash from './flash'
import totalbeerpages from './totalbeerpages'
import totalpages from './totalpages'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  flash,
  beer,
  beers,
  beerpage,
  beerSearchPage,
  beersSearch,
  brewery,
  breweries,
  brewerypage,
  brewerySearchPage,
  breweriesSearch,
  totalpages,
  totalbeerpages,
})

export default rootReducer
