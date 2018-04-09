import axios from 'axios'

export const BREWERIES = 'BREWERIES'
export const LOAD_MORE_BREWERIES = 'LOAD_MORE_BREWERIES'
export const TOTAL_PAGES = 'TOTAL_PAGES'

export const getBreweries = () => {
  const resetPage = 1
  return (dispatch) => {
    axios.get(`api/all_breweries?page=${resetPage}&per_page=10`)
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

// export const loadMoreBreweries = (currentPage, currentBreweries) => {
//   const newPage = currentPage + 1
//   return (dispatch) => {
//     axios.get(`api/all_breweries?page=${newPage}&per_page=10`)
//       .then( res => {
//         dispatch({
//           type: LOAD_MORE_BREWERIES,
//           breweries: [
//             ...currentBreweries, 
//             res.data.breweries,
//           ],
//           page: currentPage + 1
//         })
//       })
//   }
// }