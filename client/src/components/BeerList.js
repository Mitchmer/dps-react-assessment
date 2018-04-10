import React from 'react'
import styled from 'styled-components'
import { 
  Grid,
  Card, 
  Image,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class BeerList extends React.Component {

  render() {
    const { beers } = this.props
    return (
      <Grid columns={3}>
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
      </Grid>
    )
  }
}

const StyledImage = styled(Image) `
  height: 200px !important;
`

const mapStateToProps = (state) => {
  return { 
    beers: state.beers, 
    totalPages: state.totalbeerpages
  }
}

export default connect(mapStateToProps)(BeerList)