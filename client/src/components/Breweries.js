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
  Form,
  Grid, 
  Header,
  Image, 
  Input,
  Segment, 
} from 'semantic-ui-react'
import { 
  getBrewery,
  getBreweries,
  getTotalPages,
  updateBreweryPage,
  searchBreweries,
  clearBreweriesSearch,
  updateBrewerySearchPage,
} from '../actions/breweries'

class Breweries extends React.Component {
  state = { view: 'all', searchView: false, breweryView: false, brewerySearch: '' }

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
    this.setState({ 
      breweryView: !this.state.breweryView,
      view: 'breweryView', 
    })
  }

  cancelSearchView = () => {
    const { dispatch } = this.props
    dispatch(clearBreweriesSearch())
    dispatch(updateBrewerySearchPage(1))
    this.setState({ searchView: false, view: 'all' })
  }

  breweryRoute = (name) => {
    const { dispatch } = this.props
    dispatch(getBrewery(name))
    this.toggleBreweryView()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ brewerySearch: e.target.value })
  }

  handleSubmit = () => {
    const { brewerySearch } = this.state
    const { dispatch } = this.props
    dispatch(clearBreweriesSearch())
    dispatch(searchBreweries(brewerySearch, 1))
    this.setState({ searchView: true, view: 'search' })
  }

  getMoreBreweries = (res) => {
    const { breweryPage, brewerySearchPage, dispatch } = this.props
    const { brewerySearch } = this.state
    switch (res) {
      case 'all': {
        let newPage = breweryPage + 1
        dispatch(getBreweries(newPage))
        dispatch(updateBreweryPage(newPage))
        break
      }
      case 'search': {
        let newSearchPage = brewerySearchPage + 1
        dispatch(searchBreweries(brewerySearch, newSearchPage))
        dispatch(updateBrewerySearchPage(newSearchPage))
        break
      }
      default:
        return res
    }
  }
//TODO put this in separate component
  allBreweriesView = () => {
    const { breweries } = this.props
    return (
      <div>
        <StyledGrid>
          {
            breweries.map( brewery =>
              <Grid.Column key={brewery.id} mobile={14} tablet={8} computer={5}>
                <StyledSegment onClick={() => this.breweryRoute(brewery.name)}>
                  <Card>
                    {
                      brewery.images ? 
                        <Image src={brewery.images.square_large} />
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
        </StyledGrid>
        <Divider hidden />
        <Button
          fluid
          onClick={() => this.getMoreBreweries('all')}
        >
          Next 10
        </Button>
      </div>
    )
  }
//TODO put this in separate component
  breweriesSearchView = () => {
    const { breweriesSearch } = this.props
    return (
      <div>
        <StyledSegment onClick={this.cancelSearchView}>
          <Header as="h3">
            Cancel Search
          </Header>
        </StyledSegment>
        <StyledGrid>
          {
            breweriesSearch.map( brewery => 
              <Grid.Column key={brewery.id} mobile={14} tablet={8} computer={4}>
                <StyledSegment onClick={() => this.breweryRoute(brewery.name)}>
                  <Card>
                    {
                      brewery.images ?
                      <Image src={brewery.images.square_large} />
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
        </StyledGrid>
        <Divider hidden />
        <Button
          fluid
          onClick={() => this.getMoreBreweries('search')}
        >
          Next 10
        </Button>
      </div>
    )
  }

  viewHandler = () => {

    switch (this.state.view) {
      case 'all':
        return this.allBreweriesView()
      case 'search':
        return this.breweriesSearchView()
      case 'breweryView':
        return <BreweryView />
      default:
        return null
    }
  }

  render() {
    const { breweryView, searchView } = this.state
    return (
      <Container>
        <Divider hidden />
        {
          breweryView ?
            <div>
              <Button
                fluid
                onClick={()=> {
                  searchView ?
                    this.setState({ view: 'search', breweryView: !breweryView })
                  :
                    this.setState({ view: 'all', breweryView: !breweryView })
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
                  label='Breweries'
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
  width: auto !important;
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
    breweries: state.breweries,
    totalPages: state.totalpages,
    breweryPage: state.brewerypage,
    brewery: state.brewery,
    brewerySearchPage: state.brewerySearchPage,
    breweriesSearch: state.breweriesSearch,
  }
}

export default connect(mapStateToProps)(Breweries)