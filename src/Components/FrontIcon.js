import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { thumbsUp, thumbsDown } from '../Assets'

const TOTAL_WIDTH = Dimensions.get('window').width;
const TOTAL_HEIGHT = Dimensions.get('window').height;

export default function FrontIcon(props) {
  const {right} = props
  return (
    <View style={styles.container}>
      <Image source={right? thumbsUp: thumbsDown} style={styles.image} resizeMode='contain' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
    height: TOTAL_HEIGHT,
    width: TOTAL_WIDTH,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300
  },
})
