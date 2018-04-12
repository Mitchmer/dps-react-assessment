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
  Form,
  Grid,
  Header,
  Image,
  Input,
  Segment,
} from 'semantic-ui-react'
import { 
  getBeer,
  getBeers, 
  getTotalBeerPages,
  updateBeerPage,
  searchBeers,
  clearBeers,
} from '../actions/beers.js'

class Beers extends React.Component {
  state = { beerView: false, windowSize: '', beerSearch: '', searchView: false }

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
    let initialWindowSize = window.innerWidth + 'px'
    this.setState({ windowSize: initialWindowSize })
  }

  toggleBeerView = () => {
    this.setState({ 
      beerView: !this.state.beerView,
    })
  }

  cancelSearchView = () => {
    const { beerPage, dispatch } = this.props
    dispatch(clearBeers())
    dispatch(updateBeerPage(1))
    dispatch(getBeers(beerPage))
    this.setState({ searchView: false, beerSearch: '' })
  }

  beerRoute = (name) => {
    const { dispatch } = this.props
    dispatch(getBeer(name))
    this.toggleBeerView()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ beerSearch: e.target.value })
  }

  handleSubmit = () => {
    const { beerSearch } = this.state
    const { beerPage, dispatch } = this.props
    dispatch(clearBeers())
    dispatch(searchBeers(beerSearch, beerPage))
    this.setState({ searchView: true })
  }

  handleOnUpdate = () => {
    let updatedWindowSize = window.innerWidth + 'px'
    this.setState({ windowSize: updatedWindowSize })
  }

  getMoreBeers = () => {
    const { beerPage, dispatch } = this.props
    const { beerSearch, searchView } = this.state
    let newPage = beerPage + 1
    searchView ?
      dispatch(searchBeers(beerSearch, newPage))
    :
      dispatch(getBeers(newPage))      
    dispatch(updateBeerPage(newPage))
  }

  render() {
    const { totalBeerPages, beerPage, beers } = this.props
    const { beerView, searchView } = this.state
    return (
      <Container>
        {/* <Responsive onUpdate={this.handleOnUpdate}> */}
          <Divider hidden />
          {
            beerView ?
              <div>
                <Button
                  onClick={this.toggleBeerView}
                  fluid
                >
                  Back
                </Button>
                <Divider hidden />
              </div>
              :
              <div>
                <Form onSubmit={this.handleSubmit}>
                  <Input 
                    fluid 
                    onChange={(value) => this.handleChange(value) }
                    icon='search' 
                    label='Beers'
                    placeholder='Search...' 
                  />
                </Form>
                <Divider hidden />
              </div>
          }
          {
            !beerView && searchView &&
              <StyledSegment onClick={this.cancelSearchView}>
                <Header as="h3">
                  Cancel Search
                </Header>
              </StyledSegment>
          }
          <StyledGrid>
          {
            beerView ?
              <BeerView />
              :
              beers.map( beer =>
                <Grid.Column key={beer.id} mobile={14} tablet={8} computer={5}>
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
          </StyledGrid>
        {/* </Responsive> */}
      </Container>
    )
  }
}

const StyledGrid = styled(Grid)`
  display: flex !important;
  justify-content: center !important;
`

const StyledImage = styled(Image)`
  height: 256 !important;
  width: 256 !important;
`

const StyledSegment = styled(Segment)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: linear-gradient(to bottom, lightgrey, white) !important;
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

