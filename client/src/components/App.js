import Beers from './Beers'
import BeerView from './BeerView'
import Breweries from './Breweries'
import BreweryView from './BreweryView'
import Flash from './Flash';
import Home from './Home';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Segment style={styles.background}>
        <NavBar />
        <Flash />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/beers" component={Beers} />
          <Route exact path='/beer/:name' component={BeerView} />
          <Route exact path="/breweries" component={Breweries} />
          <Route exact path='/breweries/:id' component={BreweryView} />
          <Route component={NoMatch} />
        </Switch>
      </Segment>
    );
  }
}

const styles = {
  background: {
    backgroundColor: 'black',
  },
}

export default App;
