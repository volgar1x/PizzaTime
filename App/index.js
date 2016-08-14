import React, { Component } from 'react';
import {
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux'

import { Drawer, HamburgerIcon } from './Containers/Drawer'
import Movies from './Containers/Movies'
import Movie from './Containers/Movie'


class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="drawer" component={Drawer}>
          <Scene key="root">
            <Scene initial key="movies" component={Movies} title="Movies" renderLeftButton={HamburgerIcon}/>
            <Scene key="movie" component={Movie}/>
          </Scene>
        </Scene>
      </Router>
    );
  }
}


export default App
