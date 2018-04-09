import axios from 'axios'

export const BEERS = 'BEERS'

export const getBeers = (page) => {
  return (dispatch) => {
    axios.get(`api/all_beers?page=${page}&per_page=10`)
      .then( res => {
        dispatch({ type: BEERS, beers: res.data.entries })
        console.log(res.data)
      })
  }
}