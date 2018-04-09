import React from 'react'
import { connect } from 'react-redux'
import { 
  Grid,
  Card, 
  Image,
  Button,
  Container,
  Segment,
  Header,
} from 'semantic-ui-react'
// import { getBeer } from '../actions/breweries'

class BreweryView extends React.Component {

  // componentDidMount() {
  //   this.props.dispatch(getBreweries())
  // }
  
  render() {   
    const { brewery } = this.props
    return (
        <Grid>
            <Grid.Column width={4}>
              {
                brewery.images ? 
                  <Image src={brewery.images.large} />
                :
                  <Image src='http://www.phillylovesbeer.org/wp-content/uploads/2017/08/thebrewery.jpg' size='massive' />
              }
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Segment>
                  <Header as="h1">
                    {brewery.name}
                  </Header>
                  {
                    brewery.website && 
                      <Header as="h3">
                        Website: <a href={`${brewery.website}`}>{brewery.website}</a>
                      </Header>
                  }
                  <Header as="h4">
                    {brewery.description}
                  </Header>
                </Segment>
              </Grid.Row>
            </Grid.Column>
        </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { brewery: state.breweries.find( b => b.id === props.match.params.id ) }
}

export default connect(mapStateToProps)(BreweryView)