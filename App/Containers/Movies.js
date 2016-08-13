import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import StarRating from '../Components/StarRating'
import TraktService from '../Services/Trakt'


class Movie extends Component {
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
      <TouchableWithoutFeedback style={styles.row} onPress={() => this.props.onPress(this.props.movie)}>
        <Image source={{uri: images.poster.thumb}} style={styles.row}>
          <View style={styles.rowContent}>
            <StarRating rating={rating/10*5} maxStars={5}/>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    )
  }
}


class Movies extends Component {
  constructor(props, context) {
    super(props, context)

    const trakt = new TraktService()
    const ds = new ListView.DataSource({
      rowHasChanged(a, b) {
        return a !== b
      }
    })

    this.state = {
      fail: false,
      loading: true,
      dataSource: ds.cloneWithRows([]),
    }

    trakt.getMovies()
    .then((movies) => {
      this.setState({
        loading: false,
        dataSource: ds.cloneWithRows(movies),
      })
    })
    .catch((err) => {
      this.setState({
        fail: true,
        loading: false,
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
                  renderRow={this._renderRow}
                  contentContainerStyle={styles.listContent}
                  enableEmptySections/>
      </View>
    )
  }

  _renderRow = (rowData) => {
    return <Movie {...rowData} onPress={this._selectMovie}/>
  }

  _selectMovie = (movie) => {
    Actions.movie(movie)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    width: 100,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
  rowContent: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  movieTitle: {
    color: '#DEE6EC',
    textAlign: 'center',
  },
})

export default Movies