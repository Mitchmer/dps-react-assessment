import axios from 'axios'

export const BREWERY = 'BREWERY'
export const BREWERIES = 'BREWERIES'
export const BREWERY_PAGE = 'BREWERY_PAGE'
export const BREWERY_SEARCH_PAGE = 'BREWERY_SEARCH_PAGE'
export const BREWERIES_SEARCH = 'BREWERIES_SEARCH'
export const TOTAL_PAGES = 'TOTAL_PAGES'
export const CLEAR_BREWERIES_SEARCH = 'CLEAR_BREWERIES_SEARCH'

export const clearBreweriesSearch = () => {
    return (dispatch) => {
      dispatch({ type: CLEAR_BREWERIES_SEARCH, breweriesSearch: [] })
    }
}

export const getBrewery = (name) => {
  let encodedName = encodeURIComponent(name)
  return (dispatch) => {
    axios.get(`api/brewery/${encodedName}`)
      .then( res => {
        dispatch({ type: BREWERY, brewery: res.data.entries[0] })
      })
  }
}

export const updateBrewerySearchPage = (page) => {
  return (dispatch) => {
    dispatch({ type: BREWERY_SEARCH_PAGE, brewerySearchPage: page })
  }
} 

export const searchBreweries = (params, page) => {
  let encodedParams = encodeURIComponent(params)
  return (dispatch) => {
    axios.get(`api/search_breweries?page=${page}&per_page=10&query=${encodedParams}`)
      .then( res => {
        dispatch({ type: BREWERIES_SEARCH, breweriesSearch: res.data.entries })
      })
  }
}


export const updateBreweryPage = (page) => {
  return (dispatch) => {
    dispatch({ type: BREWERY_PAGE, brewerypage: page })
  }
}

export const getBreweries = (page) => {
  return (dispatch) => {
    axios.get(`api/all_breweries?page=${page}&per_page=10`)
      .then( res => {
        dispatch({ 
          type: BREWERIES, 
          breweries: res.data.entries,
        })
      })
  }
}


export const getTotalPages = () => {
  return (dispatch) => {
    axios.get(`api/all_breweries?page=1&per_page=10`)
      .then( res => {
        dispatch({ type: TOTAL_PAGES, totalpages: res.data.total_pages })
      })
  }
}