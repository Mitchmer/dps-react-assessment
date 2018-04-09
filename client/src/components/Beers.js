import BeerList from './BeerList'
import InfiniteScroll from 'react-infinite-scroller'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  Grid,
  Card, 
  Image,
  Button,
  Container,
} from 'semantic-ui-react'
import { 
  getBeers, 
  getTotalBeerPages 
} from '../actions/beers.js'
import axios from 'axios'

class Beers extends React.Component {
  state = { page: 1, total_pages: 0, currentBeers: [...this.props.beers] }

  componentDidMount() {
    // this.props.dispatch(getBeers(this.state.page))
    this.props.dispatch(getTotalBeerPages())
    axios.get(`/api/all_beers?page=1&per_page=10`)
    .then( res => {
      this.setState((state) => {
        return {
          currentBeers: [
            ...res.data.entries,
          ]
        }
      })
    })

  }

  nextPage = () => {
    this.setState(() => {
      return {
        page: this.state.page + 1
      }
    })
  }

  getMoreBeers = () => {
    const newPage = this.state.page + 1
    axios.get(`/api/all_beers?page=${newPage}&per_page=10`)
      .then( res => {
        this.setState((state) => {
          return {
            currentBeers: [
              ...this.state.currentBeers,
              ...res.data.entries,
            ],
            page: this.state.page + 1
          }
        })
      })
  }

  beerList = () => {
    const { beers, totalBeerPages } = this.props
    const { page, currentBeers } = this.state
    return (
      <Container>
        <BeerList
          beers={currentBeers}
        />
        <Button
          onClick={this.getMoreBeers}
          fluid
        >
          Next 10
        </Button>
      </Container>
    )
  }
  render() {
      return (
        this.beerList()
      )
  }
  
}

const mapStateToProps = (state) => {
  return { 
    beers: state.beers,
    totalBeerPages: state.totalbeerpages
  }
}

export default connect(mapStateToProps)(Beers)

