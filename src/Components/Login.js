import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Audio } from 'expo-av';
import { StyleSheet, View } from 'react-native'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Container, Form, Item, Input, Label, Text, Button, Content, Toast, H1, H3 } from 'native-base'
import { formatNewUser } from '../Utilities/helperFunctions';
import FlipCard from 'react-native-flip-card'

export default function Login() {
  const firebase = useFirebase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [login, setLoginCreate] = useState(true)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFlip(true)
    }, 1500);
  }, [])

  function loginWithEmail() {
    firebase.login({
      email: email,
      password: password
    })
      .catch(
        (error) => {
          Toast.show({
            text: error.message,
            duration: 3000
          })
        }
      )
  }

  flipSound = async () => {
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        require('../Assets/Sounds/Card-flip.mp3'),
        { shouldPlay: true }
      );
    } catch (error) {
      console.log(error)
    }
  }

  function createNewUserEmail() {
    firebase.createUser(
      { email, password },
      formatNewUser(userName, email))
      .then(
        setLoginCreate(true)
      )
      .catch(
        (error) => {
          Toast.show({
            text: error.message,
            duration: 3000
          })
        }
      )
  }

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <FlipCard
          style={styles.cardcontainer}
          friction={15}
          perspective={3000}
          flipHorizontal={false}
          flipVertical={true}
          flip={flip}
          clickable={false}
          useNativeDriver={true}
          alignHeight={true}
          onFlipStart={() => flipSound()}
        >
          {/* Face Side */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
            </View>
          </View>
          {/* Back Side */}
          <View style={[styles.card, styles.flipCardBack]}>
            <View style={styles.cardContent}>
              <H1 style={styles.mainTitle}>Udacity Native Cards</H1>
            </View>
          </View>
        </FlipCard>
        <H3 style={styles.titles}>{login ? 'Login' : 'Create New User'}</H3>
        <Form>
          {!login &&
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={text => setUserName(text)}
                value={userName}
              />
            </Item>}
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </Item>
        </Form>
        {login ?
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              block
              onPress={() => loginWithEmail()}>
              <Text>Login</Text>
            </Button>
            <Button
              style={styles.button}
              block
              onPress={() => setLoginCreate(false)}>
              <Text>Create New User</Text>
            </Button>
          </View> :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              style={styles.button}
              block
              onPress={() => createNewUserEmail()}>
              <Text>Create User</Text>
            </Button>
            <Button
              style={styles.button}
              block
              onPress={() => setLoginCreate(true)}>
              <Text>Return</Text>
            </Button>
          </View>
        }

      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
  },
  titles: {
    marginTop: 30,
    textAlign: 'center'
  },
  mainTitle: {
    marginTop:10,
    fontWeight: '700',
    textAlign: 'center',
    color: 'green'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 20
  },
  cardcontainer: {
    marginHorizontal:30,
    width: 320,
    height: 80,
  },
  card: {
    width: 320,
    height: 80,
    backgroundColor: '#FE474C',
    borderRadius: 4,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
  },
  flipCardBack: {
    backgroundColor: 'green'
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 3,
  },
})
