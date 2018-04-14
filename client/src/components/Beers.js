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
  clearBeersSearch,
  updateBeerSearchPage,
} from '../actions/beers.js'

class Beers extends React.Component {
  state = { view: 'all', beerView: false, searchView: false, windowSize: '', beerSearch: '' }

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
      view: 'beerView',
    })
  }

  cancelSearchView = () => {
    const { dispatch } = this.props
    dispatch(clearBeersSearch())
    dispatch(updateBeerSearchPage(1))
    this.setState({ searchView: false, view: 'all' })
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
    const { dispatch } = this.props
    dispatch(clearBeersSearch())
    dispatch(searchBeers(beerSearch, 1))
    this.setState({ searchView: true, view: 'search' })
  }

  handleOnUpdate = () => {
    let updatedWindowSize = window.innerWidth + 'px'
    this.setState({ windowSize: updatedWindowSize })
  }

  getMoreBeers = (res) => {
    const { beerPage, beerSearchPage, dispatch } = this.props
    const { beerSearch } = this.state
    switch (res) {
      case 'all': {
        let newPage = beerPage + 1
        dispatch(getBeers(newPage))      
        dispatch(updateBeerPage(newPage))
        break
      }
      case 'search': {
        let newSearchPage = beerSearchPage + 1
        dispatch(searchBeers(beerSearch, newSearchPage))
        dispatch(updateBeerSearchPage(newSearchPage))
        break
      }
      default:
        return res
    }
  }
//TODO put this in separate component
  allBeersView = () => {
    const { beers } = this.props
    return (
      <div>
        <StyledGrid>
          {
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
        </StyledGrid>
        <Divider hidden />
        <Button
          fluid
          onClick={() => this.getMoreBeers('all')}
        >
          Next 10
        </Button>
      </div>
    )
  }
//TODO put this in separate component
  beersSearchView = () => {
    const { beersSearch } = this.props
    return (
      <div>
        <StyledSegment onClick={this.cancelSearchView}>
          <Header as="h3">
            Cancel Search
          </Header>
        </StyledSegment>
        <StyledGrid>
          {
            beersSearch.map( beer =>
              <Grid.Column key={beer.id} mobile={14} tablet={8} computer={4}>
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
        </StyledGrid>
        <Divider hidden />
        <Button
          fluid
          onClick={() => this.getMoreBeers('search')}
        >
          Next 10
        </Button>
      </div>
    )
  }

  viewHandler = () => {
    switch (this.state.view) {
      case 'all': 
        return this.allBeersView()
      case 'search':
        return this.beersSearchView()
      case 'beerView':
        return <BeerView />
      default:
        return null
    }
  }

  render() {
    const { beerView, searchView } = this.state
    return (
      <Container>
        <Divider hidden />
        {
          beerView ?
            <div>
              <Button
                fluid
                onClick={() => {
                  searchView ?
                    this.setState({ view: 'search', beerView: !beerView })
                  :
                    this.setState({ view: 'all', beerView: !beerView })
                }}
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
        {this.viewHandler()}

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
    beerSearchPage: state.beerSearchPage,
    beersSearch: state.beersSearch,
    beer: state.beer,
  }
}

export default connect(mapStateToProps)(Beers)

