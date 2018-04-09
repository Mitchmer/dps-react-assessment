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
} from '../actions/beers.js'
import axios from 'axios'

class Beers extends React.Component {
  state = { page: 1, currentBeers: [], }

  componentDidMount() {
    this.props.dispatch(getBeers(this.state.page))
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


  render() {
    const {  currentBeers, page } = this.state
    const { totalBeerPages } = this.props
    return (
      <Container>
        <BeerList beers={currentBeers} />
        {
          page < totalBeerPages &&
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
    page: state.beers.page,
  }
}

export default connect(mapStateToProps)(Beers)

