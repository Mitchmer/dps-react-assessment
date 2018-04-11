import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { 
  Divider,
  Grid,
  Image,
  Segment,
  Header,
} from 'semantic-ui-react'

class BeerView extends React.Component {
  render() {
    const { beer } = this.props
    return (
        <Grid>
          {/* also have a function that checks style, abv and description */}
          <Grid.Column width={4}>
            {
              beer.labels ? 
                <StyledImage src={beer.labels.medium} />
              :
                <StyledImage src='https://cdn.craftbeer.com/wp-content/uploads/fall-beer-stein.jpg' />
            }
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              <Segment>
                <Header as="h1">
                  {beer.name}
                </Header>
                  { 
                    beer.style && 
                      <Header as="h3">
                        {beer.style.name}
                      </Header>
                  }
                  {
                    beer.abv &&
                      <Header as="h3">
                        ABV: {beer.abv}
                      </Header>
                  }
                  {
                    beer.description &&
                      <Header as="h4">
                        {beer.description}
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
  return { beer: state.beer }
}

export default connect(mapStateToProps)(BeerView)