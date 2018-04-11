import brewery_default from '../images/brewery_default.jpeg'
import BreweryView from './BreweryView'
import React from 'react'
import styled from 'styled-components'
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

  breweryRoute = (name) => {
    const { dispatch } = this.props
    dispatch(getBrewery(name))
    this.toggleBreweryView()
  }

  getMoreBreweries = () => {
    const { breweryPage, dispatch } = this.props
    let newPage = breweryPage + 1
    dispatch(getBreweries(newPage))
    dispatch(updateBreweryPage(newPage))
  }

  render() {
    const { totalPages, breweryPage, breweries } = this.props
    const { breweryView } = this.state
    return (
      <Container>
        <Divider hidden />
        {
          breweryView &&
            <div>
              <Button
                onClick={this.toggleBreweryView}
                fluid
              >
                Back
              </Button>
              <Divider hidden />
            </div>
        }
        <Grid columns={3}>
        {
          breweryView ?
            <BreweryView />
          :
            breweries.map( brewery =>
              <Grid.Column key={brewery.id}>
                <StyledSegment onClick={() => this.breweryRoute(brewery.name)}>
                  <Card>
                    {
                      brewery.images ? 
                        <StyledImage src={brewery.images.square_large} />
                      :
                        <StyledImage src={brewery_default} />
                    }
                    <Card.Content>
                      {brewery.name}
                    </Card.Content>
                  </Card>
                </StyledSegment>
                <Divider />
              </Grid.Column>
          )
        }
        {
          !breweryView &&
          breweryPage < totalPages &&
          <Button 
          fluid
          onClick={this.getMoreBreweries}
          >
                Next 10
              </Button>
        }
        <Divider hidden />
        </Grid>
      </Container>
    )
  }
}

const StyledImage = styled(Image)`
  height: 256 !important;
  width: auto !important;
`

const StyledSegment = styled(Segment)`
  align-items: center !important;
  background: linear-gradient(to bottom, lightgrey, white) !important;
  display: flex !important;
  height: 100% !important;
`
const mapStateToProps = (state) => {
  return { 
    breweries: state.breweries,
    totalPages: state.totalpages,
    breweryPage: state.brewerypage,
    brewery: state.brewery,
  }
}

export default connect(mapStateToProps)(Breweries)