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
import { getBeer } from '../actions/beers'

class BeerView extends React.Component {

  // componentDidMount() {
  //   this.props.dispatch(getBeers())
  // }
  
  render() {   
    const { beer } = this.props
    return (
        <Grid>
            <Grid.Column width={4}>
              {
                beer.labels ? 
                  <Image src={beer.labels.medium} />
                :
                  <Image src='http://mediad.publicbroadcasting.net/p/krcu/files/201604/beer_10.jpg' size='large' />
              }
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Segment>
                  <Header as="h1">
                    {beer.name}
                  </Header>
                  <Header as="h3">
                    {beer.style.name}
                  </Header>
                  <Header as="h3">
                    ABV: {beer.abv}
                  </Header>
                  <Header as="h4">
                    {beer.description}
                  </Header>
                </Segment>
              </Grid.Row>
            </Grid.Column>
        </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { beer: state.beers.find( b => b.id === props.match.params.id ) }
}

export default connect(mapStateToProps)(BeerView)