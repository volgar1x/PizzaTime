import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native'


const Brand = (props) => {
  return (
    <View style={[styles.header, props.style]}>
      <Image source={require('../Assets/trakt.png')}
             resizeMode="stretch"
             style={styles.image}
      />
      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerText, {color: '#D33E1A'}]}>Pizza</Text>
        <Text style={[styles.headerText, {color: '#F6BA57'}]}>Time</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  image: {
    height: 90,
    width: 90,
  },
  headerTextContainer: {
    flexDirection: 'row'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'GillSans-Light',
  },
})


export default Brand