/** @flow */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Sizes } from '../Theme'
import Swipeout from 'react-native-swipeout'


class EpisodeView extends Component {
  static propTypes = {
    episode: React.PropTypes.object.isRequired,
    show: React.PropTypes.object.isRequired,
    viewed: React.PropTypes.bool,

    onCheckin: React.PropTypes.func.isRequired,
  }

  state = {
    infos: false,
  }

  render() {
    return this.props.viewed
      ? this.renderViewed()
      : this.renderDefault()
  }

  renderViewed() {
    const {show, episode} = this.props

    let body;
    if (this.state.infos) {
      body = (
        <View>
          <Text style={styles.showText}>
            {show.title}
          </Text>

          <Text style={styles.dateText}>
            S{episode.season}E{episode.number}{' '}
            {episode.title}
          </Text>
        </View>
      )
    } else {
      body = <Icon name="eye" color="#fff" size={42}
                   style={{backgroundColor: 'transparent'}}/>
    }

    return (
      <Image source={{uri: show.images.fanart.full}} style={styles.episode} resizeMode="cover" activeOpacity={.6}>
        <TouchableOpacity onPress={this._onPress} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}>
          {body}
        </TouchableOpacity>
      </Image>
    )
  }

  renderDefault() {
    const {show, episode} = this.props

    const buttons = [
      {text: 'Watched', backgroundColor: '#c61017', onPress: this.props.onCheckin},
    ]

    return (
      <Swipeout autoClose right={buttons} style={styles.episode}>
        <Image source={{uri: show.images.fanart.full}} style={styles.episode} resizeMode="cover" activeOpacity={.6}>
          <View style={styles.textContainer}>
            <Text style={styles.showText}>
              {show.title}
            </Text>

            <Text style={styles.dateText}>
              S{episode.season}E{episode.number}{' '}
              {episode.title}
            </Text>
          </View>
        </Image>
      </Swipeout>
    )
  }

  _onPress = () => {
    this.setState({infos: !this.state.infos})
  }
}


const window = Dimensions.get('window')
const styles = StyleSheet.create({
  episode: {
    flex: 1,
    height: (window.height - Sizes.navBar) / 3,
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 5,
  },
  showText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
  dateText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
})


export default EpisodeView
