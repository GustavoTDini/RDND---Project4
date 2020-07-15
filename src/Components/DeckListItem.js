import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Text, Right, View, H3, Left, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DeckListItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}>
      <ListItem>
        <Left>
          <Thumbnail source={{ uri: 'https://liferay.github.io/lexiconcss/images/thumbnail_placeholder.gif' }} />
        </Left>
        <View style={{ flexDirection: 'column', flex: 3 }}>
          <H3>{props.item.title}</H3>
          <Text>Created by {props.item.author}</Text>
        </View>
        <Right>
          <View style={{ flexDirection: 'column', flex: 3, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14 }}>Cards</Text>
            <Text>{props.item.cards_number}</Text>
          </View>
        </Right>
      </ListItem>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({})
