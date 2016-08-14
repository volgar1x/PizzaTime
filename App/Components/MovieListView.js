import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
} from 'react-native'

import MovieCard from './MovieCard'


class MovieListView extends Component {
  static propTypes = {
    movies: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onSelectMovie: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    onSelectMovie() {},
  }

  constructor(props, context) {
    super(props, context)

    const dataSource = new ListView.DataSource({
      rowHasChanged(a, b) {
        return a !== b
      }
    })

    this.state = {
      dataSource,
    }
  }

  render() {
    return (
      <ListView dataSource={this.state.dataSource.cloneWithRows(this.props.movies)}
                renderRow={this._renderRow}
                contentContainerStyle={styles.listContent}
                enableEmptySections/>
    )
  }

  _renderRow = (rowData) => {
    return <MovieCard {...rowData} onPress={this.props.onSelectMovie}/>
  }
}

const styles = StyleSheet.create({
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default MovieListView