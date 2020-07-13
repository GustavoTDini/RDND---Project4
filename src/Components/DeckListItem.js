import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { ListItem, Text, Right, View, H3 } from 'native-base';

export default function DeckListItem(props) {
  return (

      <ListItem>
        <View style={{ flexDirection: 'column', flex: 2 }}>
          <H3>{props.item.title}</H3>
          <Text>Created by {props.item.author}</Text>
        </View>
        <Right>
          <View style={{ flexDirection: 'column', flex: 2, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14 }}>Cards</Text>
            <Text>{props.item.cards_number}</Text>
          </View>
        </Right>
      </ListItem>
  )
}

const styles = StyleSheet.create({})
