import axios from 'axios'

export const BREWERY = 'BREWERY'
export const BREWERIES = 'BREWERIES'
export const BREWERY_PAGE = 'BREWERY_PAGE'
export const TOTAL_PAGES = 'TOTAL_PAGES'

export const getBrewery = (name) => {
  return (dispatch) => {
    axios.get(`api/brewery/${name}`)
      .then( res => {
        dispatch({ type: BREWERY, brewery: res.data.entries[0] })
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