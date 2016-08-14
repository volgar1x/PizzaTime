import React, { Component } from 'react'

import MovieView from '../Components/MovieView'


class Movie extends Component {
  static propTypes = {
    movie: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <MovieView {...this.props.movie} />
    )
  }
}


export default Movie