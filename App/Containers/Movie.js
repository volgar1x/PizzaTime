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


class Movie extends Component {
  _renderPoster = () => {
    const window = Dimensions.get('window')

    return (
      <Image source={{uri: this.props.images.poster.full,
                      width: window.width, height: 450}}/>
    )
  }

  render() {
    return (
      <ParallaxScrollView parallaxHeaderHeight={450}
                          renderBackground={this._renderPoster}
                          style={{marginTop: 64}}>
        <Text style={{padding: 10, textAlign: 'justify'}}>
          {this.props.overview}
        </Text>

        <View style={{alignSelf: 'center'}}>
          <StarRating size="large" rating={this.props.rating/10*5} maxStars={5}/>
        </View>
      </ParallaxScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  table: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  tableRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  tableCell: {
    backgroundColor: 'rgba(0,0,0,.3)',
    alignSelf: 'stretch',
  },
  bold: {
    fontWeight: 'bold',
  },
})


export default Movie