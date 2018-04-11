import axios from 'axios'
import BreweryList from './BreweryList'
import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Segment,
  Image,
} from 'semantic-ui-react'
import { 
  getBrewery,
  getBreweries,
  getTotalPages,
  updateBreweryPage,
} from '../actions/breweries'

class Breweries extends React.Component {
  state = { breweryView: false }
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

  toggleBreweryView = () => {
    this.setState({ breweryView: !this.state.breweryView })
  }

  getMoreBreweries = () => {
    const { breweryPage, dispatch } = this.props
    let newPage = breweryPage + 1
    dispatch(getBreweries(newPage))
    dispatch(updateBreweryPage(newPage))
  }

  render() {
    const { totalPages, breweryPage } = this.props
    const { breweryView } = this.state
    return (
      <Container>
        <Grid columns={3}>
        {
          breweries.map( brewery =>
            <Grid.Column key={brewery.id}>
              <Link to={`breweries/${brewery.id}`}>
                <Card>
                  {
                    brewery.images ? 
                      <StyledImage src={brewery.images.large} />
                    :
                      <StyledImage src='http://www.phillylovesbeer.org/wp-content/uploads/2017/08/thebrewery.jpg' 
                      />
                  }
                  <Card.Content>
                    {brewery.name}
                  </Card.Content>
                </Card>
              </Link>
            </Grid.Column>
          )
          
        }
        </Grid>
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