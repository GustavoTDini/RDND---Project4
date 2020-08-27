import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import { StyleSheet, View, FlatList } from 'react-native'
import { Container, Fab, Footer, FooterTab, Button, Icon } from 'native-base';
import DeckListItem from './DeckListItem';
import { createList } from '../Utilities/helperFunctions'
import { useNavigation } from '@react-navigation/native';

export default function DeckList() {
  // get data from navigation
  const navigation = useNavigation()
  // get data from firebase
  const firebase = useFirebase()
  useFirebaseConnect('topics');
  useFirebaseConnect(`decks`)
  const decks = useSelector(state => createList(state.firebase.data.decks))

  //function to send to create new deck
  const navigateToNewDeck = () => {
    navigation.navigate('AddNewDeck')
  }

  // function to logout - as this screen is only to authed user - it redirects to login
  const logout = () => {
    firebase.logout()
  }

  //function to send to deck detail - send as data the deckId
  const navigateToDetail = (itemId) => (
    navigation.navigate('DeckDetail', {
      deckId: itemId
    })
  )

  // component to render in list
  const renderItem = ({ item }) => (
    <DeckListItem deck={item} onPress={() => navigateToDetail(item.id)} />
  );

  return (
    <Container>
      <FlatList
        data={decks}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
      {/* for diferent plataforms I choose diferents elemets - footer tabs in IOS - FAB and headericon in android */}
      {Platform.OS === 'ios'
        ? <Footer>
          <FooterTab>
            <Button
              onPress={() => logout()}>
              <Icon name="log-out" style={styles.iosIcons}/>
            </Button>
            <View style={{ flex: 1 }} />
            <Button
              onPress={() => navigateToNewDeck()}>
              <Icon name="ios-create" style={styles.iosIcons} />
            </Button>
          </FooterTab>
        </Footer>
        :
        <View style={{ flex: 1 }}>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => navigateToNewDeck()}>
            <Icon name="create" />
          </Fab>
        </View>}
    </Container>
  )
}

const styles = StyleSheet.create({
  iosIcons:{
    fontSize: 30,
    color: '#529FF3'
  }
})

