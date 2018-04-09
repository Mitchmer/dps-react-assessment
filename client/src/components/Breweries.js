import axios from 'axios'
import BreweryList from './BreweryList'
import InfiniteScroll from 'react-infinite-scroller'
import React from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Container,
  Button,
} from 'semantic-ui-react'
import { 
  getBreweries,
  getTotalPages,
} from '../actions/breweries'

class Breweries extends React.Component {
  state = { page: 1, currentBreweries: [], }

  componentDidMount() {
    this.props.dispatch(getBreweries(this.state.page))
    this.props.dispatch(getTotalPages())
    axios.get(`/api/all_breweries?page=1&per_page=10`)
    .then( res => {
      this.setState((state) => {
        return {
          currentBreweries: [
            ...res.data.entries,
          ]
        }
      })
    })

  }

  getMoreBreweries = () => {
    const newPage = this.state.page + 1
    axios.get(`/api/all_breweries?page=${newPage}&per_page=10`)
      .then( res => {
        this.setState((state) => {
          return {
            currentBreweries: [
              ...this.state.currentBreweries,
              ...res.data.entries,
            ],
            page: this.state.page + 1
          }
        })
      })
  }

  render() {
    const { currentBreweries, page } = this.state
    const { totalPages } = this.props
    return (
      <Container>
        <BreweryList breweries={currentBreweries} />
        {
          page < totalPages &&
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
    page: state.breweries.page,
  }
}

export default connect(mapStateToProps)(Breweries)