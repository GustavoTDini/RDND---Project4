import React, {useEffect, useState} from 'react'
import { StyleSheet, Image, View, Animated } from 'react-native'
import { splashIcon } from '../Assets'

export default function SplashScreen() {

  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image source = {splashIcon} style = {{opacity}} resizeMode='contain'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 'auto',
    alignContent:'center',
    justifyContent:'center'
  }
})
