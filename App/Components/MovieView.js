import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view'
import StarRating from '../Components/StarRating'


const PARALLAX_HEIGHT = 450


class MovieView extends Component {
  _renderPoster = () => {
    const window = Dimensions.get('window')

    return (
      <Image source={{uri: this.props.images.poster.full,
        width: window.width, height: PARALLAX_HEIGHT}}/>
    )
  }

  render() {
    return (
      <ParallaxScrollView parallaxHeaderHeight={PARALLAX_HEIGHT}
                          renderBackground={this._renderPoster}
                          style={styles.container}>
        <Text style={styles.overview}>
          {this.props.overview}
        </Text>

        <View style={styles.rating}>
          <StarRating size="large" rating={this.props.rating/10*5} maxStars={5}/>
        </View>
      </ParallaxScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 64,
  },
  overview: {
    padding: 10,
    textAlign: 'justify',
  },
  rating: {
    alignSelf: 'center',
  },
})


export default MovieView