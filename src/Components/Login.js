import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Container, Form, Item, Input, Label, Text, Button, Content, Toast, H1, H3 } from 'native-base'
import { formatNewUser } from '../Utilities/helperFunctions';

export default function Login() {
  const firebase = useFirebase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [login, setLoginCreate] = useState(true)

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
      <Content style={styles.content}>
        <H1 style={styles.titles}>Udacity Native Cards</H1>
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
  content:{
    marginTop: 30
  },
  titles:{
    marginTop: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 20
  },
})
