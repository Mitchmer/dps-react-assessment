import beer_default from '../images/beer_default.jpg'
import BeerView from './BeerView'
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
  getBeer,
  getBeers, 
  getTotalBeerPages,
  updateBeerPage,
} from '../actions/beers.js'

class Beers extends React.Component {
  state = { beerView: false }

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

  toggleBeerView = () => {
    this.setState({ beerView: !this.state.beerView })
  }

  beerRoute = (name) => {
    const { dispatch } = this.props
    dispatch(getBeer(name))
    this.toggleBeerView()
  }

  getMoreBeers = () => {
    const { beerPage, dispatch } = this.props
    let newPage = beerPage + 1
    dispatch(getBeers(newPage))
    dispatch(updateBeerPage(newPage))
  }

  render() {
    const { totalBeerPages, beerPage, beers } = this.props
    const { beerView } = this.state
    return (
      <Container>
        <Divider hidden />
        {
          beerView &&
            <div>
              <Button
                onClick={this.toggleBeerView}
                fluid
              >
                Back
              </Button>
              <Divider hidden />
            </div>
        }
        <Grid columns={3}>
        {
          beerView ?
            <BeerView />
          :
            beers.map( beer =>
              <Grid.Column key={beer.id}>
                <StyledSegment onClick={() => this.beerRoute(beer.name)}>
                  <Card>
                    {
                      beer.labels ? 
                        <Image src={beer.labels.medium} />
                      :
                        <StyledImage src={beer_default} />
                    }
                    <Card.Content>
                      {beer.name}
                    </Card.Content>
                  </Card>
                </StyledSegment>
                <Divider />
              </Grid.Column>
            )
        }
        { 
          !beerView &&
            beerPage < totalBeerPages &&
              <Button
                fluid
                onClick={this.getMoreBeers}
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
  width: 256 !important;
`

const StyledSegment = styled(Segment)`
  align-items: center !important;
  background: linear-gradient(to bottom, lightgrey, white) !important;
  display: flex !important;
  height: 100% !important;
`

const mapStateToProps = (state) => {
  return { 
    beers: state.beers,
    totalBeerPages: state.totalbeerpages,
    beerPage: state.beerpage,
    beer: state.beer,
  }
}

export default connect(mapStateToProps)(Beers)

