import axios from 'axios'
import BreweryList from './BreweryList'
import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Button,
} from 'semantic-ui-react'
import { 
  getBreweries,
  getTotalPages,
  updateBreweryPage,
} from '../actions/breweries'

class Breweries extends React.Component {

  componentDidMount() {
    const { dispatch, breweryPage, breweries } = this.props
    breweryPage ? 
        dispatch(updateBreweryPage(breweryPage))
      :
        dispatch(updateBreweryPage(1))
    if ( breweries.length === 0 ) {
      dispatch(getBreweries(breweryPage))
    }
    dispatch(getTotalPages())     
  }

  getMoreBreweries = () => {
    const { breweryPage, dispatch } = this.props
    let newPage = breweryPage + 1
    dispatch(getBreweries(newPage))
    dispatch(updateBreweryPage(newPage))
  }

  render() {
    const { totalPages, breweryPage } = this.props
    return (
      <Container>
        <BreweryList />
        {
          breweryPage < totalPages &&
            <Button 
              fluid
              onClick={this.getMoreBreweries}
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
    breweries: state.breweries,
    totalPages: state.totalpages,
    breweryPage: state.brewerypage,
  }
}

export default connect(mapStateToProps)(Breweries)