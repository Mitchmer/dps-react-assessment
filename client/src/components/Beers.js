import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  Grid,
  Card, 
  Image,
} from 'semantic-ui-react'
import { getBeers } from '../actions/beers.js'

class Beers extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(getBeers())
  }



  render() {
    const { beers } = this.props
    return (
      <Grid columns={3}>
          {
            beers.map( beer =>
              <Grid.Column>
                <Card key={beer.id}>
                  {
                    beer.labels ? 
                      <Image src={beer.labels.medium} />
                    :
                      <Image src='http://mediad.publicbroadcasting.net/p/krcu/files/201604/beer_10.jpg' />
                  }
                  <Card.Content>
                    {beer.name}
                  </Card.Content>
                </Card>
              </Grid.Column>
            )
          }
      </Grid>
    )
  }
  
}

const mapStateToProps = (state) => {
  return { beers: state.beers }
}

export default connect(mapStateToProps)(Beers)