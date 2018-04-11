import axios from 'axios'

export const BEER = 'BEER'
export const BEERS = 'BEERS'
export const TOTAL_BEER_PAGES = 'TOTAL_BEER_PAGES'
export const BEER_PAGE = 'BEER_PAGE'

export const getBeer = (name) => {
  return (dispatch) => {
    axios.get(`api/beer/${name}`)
      .then( res => {
        dispatch({ type: BEER, beer: res.data.entries[0] })
        console.log('success')
      })
  }
}

export const updateBeerPage = (page) => {
  page ? null : page = 1
  return (dispatch) => {
    dispatch({ type: BEER_PAGE, beerpage: page })
  }
}

export const getBeers = (page) => {
  return (dispatch) => {
    axios.get(`api/all_beers?page=${page}&per_page=10`)
      .then( res => {
        dispatch({ type: BEERS, beers: res.data.entries })
        console.log(res.data)
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