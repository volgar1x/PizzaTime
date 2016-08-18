import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'

import BaseDrawer from 'react-native-drawer'
import { DefaultRenderer, Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { NativeSizes } from '../Theme/Native'


export const HamburgerIcon = () => {
  return (
    <TouchableOpacity onPress={() => Actions.refresh({key: "drawer", open: true})} style={styles.hamburger}>
      <Icon name="bars"
            size={25}
            style={styles.hamburgerIcon}
      />
    </TouchableOpacity>
  )
}


class DrawerContentLink extends Component {
  static contextTypes = {
    drawer: React.PropTypes.object,
  }

  static propTypes = {
    scene: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.drawerLink}>
        <Icon name={this.props.icon} style={styles.drawerLinkIcon}/>
        <Text style={styles.drawerLinkText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }

  _onPress = () => {
    this.context.drawer.toggle()
    Actions[this.props.scene](this.props.params)
  }
}


const DrawerContent = (props) => {
  return (
    <ScrollView style={styles.content}>
      <DrawerContentLink scene="calendar" title="Calendar" icon="calendar"/>
      <DrawerContentLink scene="movies" title="Trending Movies" icon="film"/>
      <DrawerContentLink scene="login" title="Login" icon="sign-in"/>
    </ScrollView>
  )
}


export class Drawer extends Component {
  render() {
    const state = this.props.navigationState
    const children = state.children

    return (
      <BaseDrawer ref="navigation"
                  type="displace"
                  open={state.open}
                  onOpen={() => Actions.refresh({key: state.key, open: true})}
                  onClose={() => Actions.refresh({key: state.key, open: false})}
                  content={<DrawerContent/>}
                  tapToClose
                  openDrawerOffset={0.2}
                  panCloseMask={0.2}
                  negotiatePan
                  tweenHandler={(ratio) => ({
                    main: { opacity: Math.max(0.54, 1 - ratio) }
                  })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </BaseDrawer>
    )
  }
}

const DRAWER_LINK_SIZE = 22
const HAMBURGER_SIZE = 25

const styles = StyleSheet.create({
  content: {
    paddingTop: 80,
  },
  drawerLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    marginBottom: 30,
  },
  drawerLinkActive: {
    borderLeftColor: '#0680FF',
    borderLeftWidth: 2,
    borderStyle: 'solid',
  },
  drawerLinkIcon: {
    width: DRAWER_LINK_SIZE + 2,
    fontSize: DRAWER_LINK_SIZE,
  },
  drawerLinkText: {
    marginLeft: 20,
    fontSize: DRAWER_LINK_SIZE,
    fontWeight: '600',
    fontFamily: 'Gill Sans',
  },
  hamburger: {
    marginTop: NativeSizes.statusBar,
    width: HAMBURGER_SIZE / 1.6667 * 2 + HAMBURGER_SIZE,
    height: NativeSizes.navBar,
  },
  hamburgerIcon: {
    marginTop: (NativeSizes.navBar - HAMBURGER_SIZE) / 2,
    marginLeft: HAMBURGER_SIZE / 1.6667,
    width: HAMBURGER_SIZE,
  },
})
