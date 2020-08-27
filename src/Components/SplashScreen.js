import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base';
import FrontAnimation from './FrontAnimation';


export default function SplashScreen() {

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <FrontAnimation/>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
