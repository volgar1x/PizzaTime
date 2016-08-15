import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import MovieView from '../Components/MovieView'
import { Sizes } from '../Theme'


class Movie extends Component {
  static propTypes = {
    movie: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <MovieView {...this.props.movie} style={styles.container} />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.navBar,
  },
})


export default Movie