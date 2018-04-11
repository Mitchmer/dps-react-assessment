import axios from 'axios'

export const BEER = 'BEER'
export const BEERS = 'BEERS'
export const BEER_PAGE = 'BEER_PAGE'
export const TOTAL_BEER_PAGES = 'TOTAL_BEER_PAGES'

export const getBeer = (name) => {
  let encodedName = encodeURIComponent(name)
  debugger
  return (dispatch) => {
    axios.get(`api/beer/${encodedName}`)
      .then( res => {
        dispatch({ type: BEER, beer: res.data.entries[0] })
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