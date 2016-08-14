import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  WebView,
  AsyncStorage,
} from 'react-native'

import TraktService from '../Services/Trakt'
import Brand from '../Components/Brand'
import {Login as OAuth2Login} from '../Components/OAuth2'
import TraktButton from '../Components/TraktButton'
import { Sizes } from '../Theme'


class Login extends Component {
  // loading -> login -> {logged, failed}
  state = {
    loading: true,
    login: false,
    logged: false,
    failed: false,
  }

  constructor(props, context) {
    super(props, context)

    this._api = new TraktService()
  }

  componentDidMount() {
    (async function() {
      if (await this._api.isLogged()) {
        this.setState({
          loading: false,
          logged: true,
        })
      } else {
        this.setState({
          loading: false,
        })
      }
    }).call(this)
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if (this.state.login) {
      return (
        <OAuth2Login api={this._api}
                     onStartLogin={this._onStartLogin}
                     onLoginSuccess={this._onLoginSuccess}
                     onLoginError={this._onLoginError}
                     style={styles.container}
        />
      )
    }

    return (
      <View style={styles.container}>
        <Brand style={styles.header}/>

        <View style={styles.buttons}>
          {!this.state.logged && <TraktButton label="Login with Trakt.tv" onPress={this._onLogin}/>}
          {this.state.logged && <TraktButton label="Logout from Trakt.tv" onPress={this._onLogout}/>}
        </View>

        {this.state.failed &&
          <Text style={styles.errorText}>
            There was some problem connecting to Trakt.tv, please try again later.
          </Text>}
      </View>
    )
  }

  _onLogin = () => {
    this.setState({
      login: true,
    })
  }

  _onLogout = () => {
    this.setState({
      loading: true,
    })

    this._api.appLogout()
    .then(() => {
      this.setState({
        loading: false,
        logged: false,
      })
    })
  }

  _onStartLogin = () => {
    this.setState({
      loading: true,
      login: false,
    })
  }

  _onLoginSuccess = () => {
    this.setState({
      loading: false,
      logged: true,
    })
  }

  _onLoginError = () => {
    this.setState({
      loading: false,
      failed: true,
    })
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.navBar,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    margin: 60,
  },
  buttons: {
    alignItems: 'center',
  },
  errorText: {
    color: '#8D8D92',
    textAlign: 'center',
    fontSize: 16,
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
})


export default Login
