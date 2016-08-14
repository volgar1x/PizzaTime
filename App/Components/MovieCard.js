import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native'

import StarRating from './StarRating'


class MovieCard extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    movie: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    onPress() {},
  }

  render() {
    const {movie: {rating, images}} = this.props

    return (
      <TouchableWithoutFeedback style={styles.card} onPress={() => this.props.onPress(this.props.movie)}>
        <Image source={{uri: images.poster.thumb}} style={styles.card}>
          <View style={styles.cardContent}>
            <StarRating rating={rating/10*5} maxStars={5}/>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
  cardContent: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
})

export default MovieCard