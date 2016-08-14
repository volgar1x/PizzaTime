import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native'


class Input extends Component {
  render() {
    return (
      <View style={styles.inputView}>
        <TextInput style={styles.input} {...this.props}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: 'row',

    margin: 3,
    paddingLeft: 10,
    paddingRight: 10,

    borderBottomWidth: .5,
    borderBottomColor: '#8D8D92',
  },
  input: {
    flex: 1,
    height: 39,
  },
})


export default Input