import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="Go to List"
        onPress={() => navigation.navigate('CardList')}
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
