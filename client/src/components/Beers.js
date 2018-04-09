import InfiniteScroll from 'react-infinite-scroller'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  Grid,
  Card, 
  Image,
} from 'semantic-ui-react'
import { getBeers } from '../actions/beers.js'

class Beers extends React.Component {
  state = { page: 1, total_pages: 0, }

  componentDidMount() {
    this.props.dispatch(getBeers(this.state.page))
  }

  render() {
    const { beers } = this.props
    const { page } = this.state
    return (
      <Grid columns={3}>
        <InfiniteScroll
            // pageStart={page}
            // loadMore={loadFunc}
        >
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
        </InfiniteScroll>
      </Grid>
    )
  }
  
}

const mapStateToProps = (state) => {
  return { beers: state.beers }
}

export default connect(mapStateToProps)(Beers)