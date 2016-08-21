import React  from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'

import moment from 'moment'

import EpisodeView from '../Components/EpisodeView'
import { Sizes } from '../Theme'
import TraktService from '../Services/Trakt'


const Button = ({label, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{color: '#0C83FA', fontSize: 16, margin: 20, alignSelf: 'center'}}>{label}</Text>
  </TouchableOpacity>
)


function cloneDataSource(dataSource, episodes) {
  const groupedEpisodes = {}
  const sectionIdentities = []
  for (const episode of episodes) {
    const first_aired = moment(episode.first_aired).fromNow()

    if (groupedEpisodes[first_aired]) {
      groupedEpisodes[first_aired].push(episode)
    } else {
      sectionIdentities.push(first_aired)
      groupedEpisodes[first_aired] = [episode]
    }
  }

  return dataSource.cloneWithRowsAndSections(groupedEpisodes, sectionIdentities.reverse())
}


class Calendar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this._api = new TraktService()


    this.state = {
      refreshing: true,
      episodes: [],
    }
  }

  loadData(start_date, days) {
    this._start_date = start_date
    this._days = days

    return this._api.getMyShowsCalendar(this._start_date.format(), this._days)
    .then((episodes) => {
      this.setState({
        refreshing: false,
        episodes: episodes,
      })
    })
  }

  componentDidMount() {
    this.loadData(moment.utc().startOf('isoweek'), 7)
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged(a, b) {
        return a !== b
      },
      sectionHeaderHasChanged(a, b) {
        return a !== b
      },
    })

    return (
      <ListView dataSource={cloneDataSource(dataSource, this.state.episodes)}
                renderRow={this._renderRow}
                renderSectionHeader={this._renderSectionHeader}
                style={styles.container}

                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
      />
    )
  }

  _renderRow = (episode) => {
    return <EpisodeView {...episode} onCheckin={() => this.checkin(episode)}/>
  }

  _renderSectionHeader = (section, sectionID) => {
    return (
      <View style={{padding: 5, backgroundColor: '#F1F2F4', shadowOffset: {height: 1, width: 0}, shadowOpacity: 0.8}}>
        <Text style={{backgroundColor: 'transparent'}}>{sectionID}</Text>
      </View>
    )
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.loadData(this._start_date, this._days + 7)
  }

  async checkin(episode) {
    await this._api.checkin(episode)

    for (const x of this.state.episodes) {
      if (x.episode.ids.trakt === episode.episode.ids.trakt) {
        x.viewed = true
      }
    }

    this.setState({
      episodes: this.state.episodes,
    })
  }
}


const styles = {
  container: {
    marginTop: Sizes.navBar,
    flex: 1,
    flexDirection: 'column',
  },
}


export default Calendar