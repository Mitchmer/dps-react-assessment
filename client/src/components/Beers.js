import BeerList from './BeerList'
import React from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Container,
} from 'semantic-ui-react'
import { 
  getBeers, 
  getTotalBeerPages,
  updateBeerPage,
} from '../actions/beers.js'
import axios from 'axios'

class Beers extends React.Component {

  componentDidMount() {
    const { dispatch, beerPage, beers } = this.props
    beerPage ? 
        dispatch(updateBeerPage(beerPage))
      :
        dispatch(updateBeerPage(1))
    if ( beers.length === 0 ) {
      dispatch(getBeers(beerPage))
    }
    dispatch(getTotalBeerPages())     
  }

  getMoreBeers = () => {
    const { beerPage, dispatch } = this.props
    let newPage = beerPage + 1
    dispatch(getBeers(newPage))
    dispatch(updateBeerPage(newPage))
  }

  render() {
    const { totalBeerPages, beerPage } = this.props
    return (
      <Container>
        <BeerList />
        {
          beerPage < totalBeerPages &&
            <Button
              fluid
              onClick={this.getMoreBeers}
            >
              Next 10
            </Button>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    beers: state.beers,
    totalBeerPages: state.totalbeerpages,
    beerPage: state.beerpage
  }
}

export default connect(mapStateToProps)(Beers)

