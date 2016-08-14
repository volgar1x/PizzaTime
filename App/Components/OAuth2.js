import React, { Component } from 'react'
import { WebView } from 'react-native'


export class Login extends Component {
  static propTypes = {
    style: React.PropTypes.any,

    api: React.PropTypes.shape({
      authorizeUri: React.PropTypes.string,
      isAppLoginRedirection: React.PropTypes.func,
      appLogin: React.PropTypes.func,
    }),

    onStartLogin: React.PropTypes.func,
    onLoginSuccess: React.PropTypes.func,
    onLoginError: React.PropTypes.func,
  }

  render() {
    return (
      <WebView style={this.props.style} source={{uri: this.props.api.authorizeUri}}
               javaScriptEnabled
               domStorageEnabled
               startInLoadingState
               onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}
      />
    )
  }

  _onShouldStartLoadWithRequest = (event) => {
    if (this.props.api.isAppLoginRedirection(event.url)) {
      this.props.onStartLogin();

      this.props.api.appLogin(event.url)
      .then((resp) => {
        this.props.onLoginSuccess(resp)
      })
      .catch((err) => {
        this.props.onLoginError(err)
      })

      return false
    }
    return true
  }
}