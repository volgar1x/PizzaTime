import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native'


class TraktButton extends Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func,
  }

  render() {
    return (
      <TouchableHighlight underlayColor="#c61017" style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.label}>{this.props.label.toUpperCase()}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ed1c24',
    borderColor: '#de1219',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    color: '#fff',
    fontFamily: 'PingFangTC-Regular',
  },
})

export default TraktButton