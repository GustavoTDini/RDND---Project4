import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Text, Right, View, H3, Left } from 'native-base';
import Thumbnail from './Thumbnail'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DeckListItem(props) {

  return (
    <TouchableOpacity
      onPress={props.onPress}>
      <ListItem>
        <Left style={{ flex: 1 }}>
          <Thumbnail type={props.deck.type} />
        </Left>
        <View style={{ flexDirection: 'column', flex: 3 }}>
          <H3>{props.deck.title}</H3>
          <Text note>Created by {props.deck.author}</Text>
        </View>
        <Right>
          <View style={{ flexDirection: 'column', flex: 1, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, width: 40 }}>Cards</Text>
            <Text>{props.deck.cards? Object.keys(props.deck.cards).length: 0}</Text>
          </View>
        </Right>
      </ListItem>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({

})
