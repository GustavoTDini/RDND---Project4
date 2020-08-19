import React, {useEffect, useState} from 'react'
import { StyleSheet, Image, View, Animated } from 'react-native'
import { Container, Content } from 'native-base';
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
    <Container>
      <Content>
        <Animated.Image source = {splashIcon} style = {{opacity}} resizeMode='center'/>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  content:{
    flex: 1,
    marginTop: 'auto',
    alignContent:'center',
    justifyContent:'center'
  }
})
