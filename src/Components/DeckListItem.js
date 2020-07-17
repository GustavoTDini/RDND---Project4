import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { StyleSheet } from 'react-native'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { ListItem, Text, Right, View, H3, Left, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function DeckListItem(props) {

  useFirebaseConnect(`types/${props.item.type}`)
  const type = useSelector(({ firebase: { data: { types } } }) => types && types[props.item.type])

  const firebase = useFirebase()
  const [iconUrl, setIconUrl] = useState('')
  
  var iconreference = firebase.storage().ref(type.icon);
  

  useEffect(() => {
    
    iconreference.getDownloadURL().then(function(url){
      console.log(url)
      setIconUrl(url)
      console.log(iconUrl)
    }).catch((e) => console.log('getting downloadURL of image error => ', e));
  }, [])

  return (
    <TouchableOpacity
      onPress={props.onPress}>
      <ListItem>
        <Left style={{ flex: 1 }}>
          <View style={{backgroundColor: [type.backgroundColor]}}>
          <Thumbnail source={{uri: iconreference}} style={{ImageResizeMode: 'center'}}/>
          </View>
        </Left>
        <View style={{ flexDirection: 'column', flex: 3 }}>
          <H3>{props.item.title}</H3>
          <Text>Created by {props.item.author}</Text>
        </View>
        <Right>
          <View style={{ flexDirection: 'column', flex: 2, alignContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 14 }}>Cards</Text>
            <Text>{props.item.cards_number}</Text>
          </View>
        </Right>
      </ListItem>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({

})
