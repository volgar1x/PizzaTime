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


class EpisodeView extends Component {
  static propTypes = {
    trakt: React.PropTypes.object.isRequired,
    episode: React.PropTypes.object.isRequired,
    show: React.PropTypes.object.isRequired,
    viewed: React.PropTypes.bool,
  }

  state = {
    infos: false,
  }

  render() {
    const {show: {images: {fanart}}} = this.props

    return (
      <Image source={{uri: fanart.full}} style={styles.episode} resizeMode="cover" activeOpacity={.6}>
        {this.props.viewed && this.renderViewed()}
        {!this.props.viewed && this.renderDefault()}
      </Image>
    )
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
      <TouchableOpacity onPress={this._onPress} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}>
        {body}
      </TouchableOpacity>
    )
  }

  renderDefault() {
    const {episode, show} = this.props

    return (
      <View style={styles.textContainer}>
        <Text style={styles.showText}>
          {show.title}
        </Text>

        <Text style={styles.dateText}>
          S{episode.season}E{episode.number}{' '}
          {episode.title}
        </Text>
      </View>
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