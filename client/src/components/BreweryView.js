import brewery_default from '../images/brewery_default.jpeg'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  Grid,
  Image,
  Segment,
  Header,
} from 'semantic-ui-react'
// import { getBeer } from '../actions/breweries'

class BreweryView extends React.Component {

  render() {   
    const { brewery } = this.props
    return (
        <Grid>
            <Grid.Column width={4}>
              {
                brewery.images ? 
                  <StyledImage src={brewery.images.square_large} />
                :
                  <StyledImage src={brewery_default} />
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
                  {
                    brewery.description &&
                      <Header as="h4">
                        {brewery.description}
                      </Header>
                  }
                </Segment>
              </Grid.Row>
            </Grid.Column>
        </Grid>
    )
  }
}

const StyledImage = styled(Image)`
  height: 256 !important;
  width: 256 !important;
  border-radius: 3%;
`

const mapStateToProps = (state) => {
  return { brewery: state.brewery }
}

export default connect(mapStateToProps)(BreweryView)