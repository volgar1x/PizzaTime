import React, { Component } from 'react';
import {
} from 'react-native';
import { Scene, Router, ActionConst } from 'react-native-router-flux'

import { Drawer, HamburgerIcon } from './Containers/Drawer'
import Movies from './Containers/Movies'
import Movie from './Containers/Movie'
import Login from './Containers/Login'


class App extends Component {
  render() {
    const main = {
      renderLeftButton: HamburgerIcon,
      type: ActionConst.REPLACE,
    }

    return (
      <Router>
        <Scene key="drawer" component={Drawer}>
          <Scene key="root">
            <Scene initial key="movies" component={Movies} title="Movies" {...main}/>
            <Scene key="login" component={Login} title="Login" {...main}/>

            <Scene key="movie" component={Movie}/>
          </Scene>
        </Scene>
      </Router>
    );
  }
}


export default App
