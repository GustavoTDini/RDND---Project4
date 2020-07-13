import React, { useState } from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
import { Container, Fab, Footer, FooterTab, Button, Icon, List, Content } from 'native-base';
import DeckListItem from './DeckListItem';

const DATA = [
  {
    id: 'bd76cbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Deck',
    cards_number: 20,
    author: 'John Doe',
    date_created: 6978641924629,
    views_number: 30
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd915a97f63',
    title: 'Second Deck',
    cards_number: 30,
    author: 'Isoca',
    date_created: 6978641924629,
    views_number: 40
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Deck',
    cards_number: 14,
    author: 'Gustavo Dini',
    date_created: 6978641924629,
    views_number: 50
  },
  {
    id: '58694a0f-3da1-471f-bd56-145571e29d72',
    title: 'Fourth Deck',
    cards_number: 50,
    author: 'Mariana Lima',
    date_created: 6978641924629,
    views_number: 50
  },
];


export default function DeckList() {

  const renderItem = ({ item }) => (
    <DeckListItem item={item} />
  );

  return (
    <Container>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {Platform.OS === 'ios'
        ? <Footer>
          <FooterTab>
            <View style={{flex:3}}/>
            <Button>
              <Icon name="ios-create" style={{fontSize:30}}/>
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
            position="bottomRight">
            <Icon name="create" />
          </Fab>
        </View>}
    </Container>
  )
}

const styles = StyleSheet.create({})

