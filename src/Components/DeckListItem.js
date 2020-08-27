import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Text, Right, View, H3, Left } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Thumbnail from './Thumbnail'

// Component render the content in the list
export default function DeckListItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}>
      <ListItem>
        <Left style={styles.left}>
          <Thumbnail topic={props.deck.topic} />
        </Left>
        <View style={styles.main}>
          <H3>{props.deck.title}</H3>
          <Text note>Created by {props.deck.author}</Text>
        </View>
        <Right>
          <View style={styles.cardsNumberView}>
            <Text style={styles.cardsText}>Cards</Text>
            <Text>{props.deck.cards? Object.keys(props.deck.cards).length: 0}</Text>
          </View>
        </Right>
      </ListItem>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  left:{
    flex:1
  },
  main:{ 
    flexDirection: 'column', 
    flex: 3 
  },
  cardsNumberView:{ 
    flexDirection: 'column', 
    flex: 1, 
    alignContent: 'center', 
    alignItems: 'center' 
  },
  cardsText:{ 
    fontSize: 14, 
    width: 40 }
})
