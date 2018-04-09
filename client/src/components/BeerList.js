import React from 'react'
import { 
  Grid,
  Card, 
  Image,
  Button,
  Container,
} from 'semantic-ui-react'
import styled from 'styled-components'

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
                <Card>
                  {
                    beer.labels ? 
                      <StyledImage src={beer.labels.medium} size='tiny' />
                    :
                      <StyledImage src='http://mediad.publicbroadcasting.net/p/krcu/files/201604/beer_10.jpg' size='tiny' />
                  }
                  <Card.Content>
                    {beer.name}
                  </Card.Content>
                </Card>
              </Grid.Column>
            )
          }
        {/* </InfiniteScroll> */}
      </Grid>
    )
  }
}

const StyledImage = styled(Image) `
  height: 200 !important;
`

export default BeerList