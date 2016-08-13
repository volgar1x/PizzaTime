import React, { Component } from 'react';
import {
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux'

import Movies from './Containers/Movies'
import Movie from './Containers/Movie'


class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene initial key="movies" component={Movies} title="Movies"/>
          <Scene key="movie" component={Movie}/>
        </Scene>
      </Router>
    );
  }
}

export default App
