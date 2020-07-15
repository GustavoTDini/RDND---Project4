import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'
import { handleInitialData } from '../ReduxStore/actions/shared'

export default function Login({ navigation }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  }, [])

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="Go to List"
        onPress={() => navigation.navigate('DeckList')}
      />
    </View>
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
