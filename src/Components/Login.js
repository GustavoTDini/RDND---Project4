import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { useFirebase, isLoaded, isEmpty  } from 'react-redux-firebase'
import { Container, Form, Item, Input, Label, Text, Button, Content, Toast } from 'native-base'

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
    }
    ).catch(
      (error) => {
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          duration: 3000
        })
      }
    )
  }

  function createNewUserEmail({ email, password, username }) {
    firebase.createUser(
      { email, password },
      { username, email }
    ).then(
      setLoginCreate(true)
    ).catch(
      (error) => {
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          duration: 3000
        })
      }
    )

  }

  return (
    <Container>
      <Content>
        <Text>{login ? 'Login' : 'Create New User'}</Text>
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
              textContentType='password'
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </Item>
        </Form>

        {login ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => loginWithEmail()}>
              <Text>Login</Text>
            </Button>
            <Button onPress={() => setLoginCreate(false)}>
              <Text>Create New User</Text>
            </Button>
          </View> :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => createNewUserEmail()}>
              <Text>Create User</Text>
            </Button>
            <Button onPress={() => setLoginCreate(true)}>
              <Text>Return</Text>
            </Button>
          </View>
        }

      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
