import React from 'react'
import BeerView from './BeerView'
import { 
  Grid,
  Card, 
  Image,
  Button,
  Container,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getBeer } from '../actions/beers'

class BeerList extends React.Component {

  render() {
    const { beers } = this.props
    return (
      <Grid columns={3}>
        {/* <InfiniteScroll
            pageStart={page}
            loadMore={this.getMoreBeers}
            hasMore={page < totalBeerPages}
        > */}
          {
            beers.map( beer =>
              <Grid.Column key={beer.id}>
                <Link to={`beers/${beer.id}`}>
                  <Card>
                    {
                      beer.labels ? 
                        <StyledImage src={beer.labels.medium} />
                      :
                        <StyledImage src='http://mediad.publicbroadcasting.net/p/krcu/files/201604/beer_10.jpg' size='tiny' />
                    }
                    <Card.Content>
                      {beer.name}
                    </Card.Content>
                  </Card>
                </Link>
              </Grid.Column>
            )
          }
        {/* </InfiniteScroll> */}
      </Grid>
    )
  }
}

const StyledImage = styled(Image) `
  height: 200px !important;
`
const mapStateToProps = (state) => {
  return { beers: state.beers }
}

export default connect(mapStateToProps)(BeerList)