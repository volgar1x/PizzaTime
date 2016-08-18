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


function formatDate(first_aired: moment.Moment, start_date, days) {
  // const end_date = start_date.clone().add(days, 'days')
  //
  // if (end_date.diff(start_date, 'weeks', true) < 1) {
  //   return 'dddd [at] LT'
  // } else if (end_date.diff(start_date, 'months', true) < 1) {
  //   return 'dddd DD [at] LT'
  // }
  //
  // return 'MMMM Do [at] LT'

  return first_aired.fromNow()
}


class Calendar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this._api = new TraktService()


    this.state = {
      refreshing: true,
      episodes: new ListView.DataSource({
        rowHasChanged(a, b) {
          return a !== b
        },
        sectionHeaderHasChanged(a, b) {
          return a !== b
        },
      }),
    }
  }

  loadData(start_date, days) {
    console.log(`loading... ${start_date.format()},${days}`)

    this._start_date = start_date
    this._days = days

    return this._api.getMyShowsCalendar(this._start_date.format(), this._days)
    .then((episodes) => {
      const groupedEpisodes = {}
      const sectionIdentities = []
      for (const episode of episodes) {
        const first_aired = moment(episode.first_aired)
        const first_aired_human = formatDate(first_aired, start_date, days)

        if (groupedEpisodes[first_aired_human]) {
          groupedEpisodes[first_aired_human].push(episode)
        } else {
          sectionIdentities.push(first_aired_human)
          groupedEpisodes[first_aired_human] = [episode]
        }
      }

      this.setState({
        refreshing: false,
        episodes: this.state.episodes.cloneWithRowsAndSections(groupedEpisodes, sectionIdentities.reverse()),
      })
    })
  }

  componentDidMount() {
    this.loadData(moment.utc().startOf('isoweek'), 7)
  }

  render() {
    return (
      <ListView dataSource={this.state.episodes}
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
    return <EpisodeView trakt={this._api} {...episode}/>
  }

  _renderSectionHeader = (section, sectionID) => {
    return (
      <View style={{padding: 5, backgroundColor: '#F1F2F4', shadowOffset: {height: 1, width: 0}, shadowOpacity: 0.8}}>
        <Text style={{backgroundColor: 'transparent'}}>{sectionID}</Text>
      </View>
    )
  }

  _onRefresh = () => {
    console.log('request refresh')
    this.setState({refreshing: true})
    this.loadData(this._start_date, this._days + 7)
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