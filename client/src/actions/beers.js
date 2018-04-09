import axios from 'axios'

export const BEERS = 'BEERS'
export const TOTAL_BEER_PAGES = 'TOTAL_BEER_PAGES'

export const getBeers = (page) => {
  return (dispatch) => {
    axios.get(`api/all_beers?page=${page}&per_page=10`)
      .then( res => {
        dispatch({ type: BEERS, beers: res.data.entries })
        console.log(res.data)
        return console.log('yay')
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