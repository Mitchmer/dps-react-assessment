import React from 'react'
import styled from 'styled-components'
import { 
  Card,
  Grid,
  Image,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class BreweryList extends React.Component {

  render() {
    const { breweries } = this.props

    return (
      <Grid columns={3}>
        {
          breweries.map( brewery =>
            <Grid.Column key={brewery.id}>
              <Link to={`breweries/${brewery.id}`}>
                <Card>
                  {
                    brewery.images ? 
                      <StyledImage src={brewery.images.large} />
                    :
                      <StyledImage src='http://www.phillylovesbeer.org/wp-content/uploads/2017/08/thebrewery.jpg' 
                      />
                  }
                  <Card.Content>
                    {brewery.name}
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

const mapStateToProps = (state) => {
  return {
    breweries: state.breweries,
    totalPages: state.totalpages,
  }
}

const StyledImage = styled(Image) `
  height: 100px !important;
  width: auto;
`

export default connect(mapStateToProps)(BreweryList)