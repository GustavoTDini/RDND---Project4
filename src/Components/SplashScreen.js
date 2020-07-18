import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { splashIcon } from '../Utilities/assets'

export default function SplashScreen() {
  return (
    <View>
      <Image source = {splashIcon}/>
    </View>
  )
}

const styles = StyleSheet.create({})
