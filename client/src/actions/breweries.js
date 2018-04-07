import axios from 'axios'

export const BREWERIES = 'BREWERIES'

export const getBreweries = () => {
  return (dispatch) => {
    axios.get('api/all_breweries')
      .then( res => {
        dispatch({ type: BREWERIES, breweries: res.data.entries })
        console.log(res.data)
      })
  }
}