import axios from 'axios'

export const BEER = 'BEER'
export const BEERS = 'BEERS'
export const BEER_PAGE = 'BEER_PAGE'
export const BEER_SEARCH_PAGE = 'BEER_SEARCH_PAGE'
export const BEERS_SEARCH = 'BEERS_SEARCH'
export const TOTAL_BEER_PAGES = 'TOTAL_BEER_PAGES'
export const CLEAR_BEERS_SEARCH = 'CLEAR_BEERS_SEARCH'

export const clearBeersSearch = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_BEERS_SEARCH, beersSearch: [] })
  }
}

export const getBeer = (name) => {
  let encodedName = encodeURIComponent(name)
  return (dispatch) => {
    axios.get(`api/beer/${encodedName}`)
      .then( res => {
        dispatch({ type: BEER, beer: res.data.entries[0] })
      })
  }
}

export const updateBeerSearchPage = (page) => {
  return (dispatch) => {
    dispatch({ type: BEER_SEARCH_PAGE, beerSearchPage: page })
  }
}

export const searchBeers = (params, page) => {
  let encodedParams = encodeURIComponent(params)
  return (dispatch) => {
    axios.get(`api/search_beers?page=${page}&per_page=10&query=${encodedParams}`)
      .then( res => {
        dispatch({ type: BEERS_SEARCH, beersSearch: res.data.entries })
      })
  }
}

export const updateBeerPage = (page) => {
  return (dispatch) => {
    dispatch({ type: BEER_PAGE, beerpage: page })
  }
}

export const getBeers = (page) => {
  return (dispatch) => {
    axios.get(`api/all_beers?page=${page}&per_page=10`)
      .then( res => {
        dispatch({ type: BEERS, beers: res.data.entries })
      })
  }
}
export const getTotalBeerPages = () => {
  return (dispatch) => {
    axios.get(`api/all_beers?page=1&per_page=10`)
      .then( res => {
        dispatch({ type: TOTAL_BEER_PAGES, totalbeerpages: res.data.total_pages })
      })
  }
}