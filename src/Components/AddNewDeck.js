import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import 'firebase/storage'
import { Container, Content, Form, Item, Input, Label, Text, ActionSheet, Button, Spinner, Picker, Icon } from 'native-base';
import { saveImageToStorage, getPermissionAsync,getImageFromCamera, getImageFromRoll, createList, formatNewDeck } from '../Utilities/helperFunctions';
import { useNavigation } from '@react-navigation/native'
import { ANDROID_BUTTONS, IOS_BUTTONS, CANCEL_INDEX } from '../Utilities/Constants'

export default AddNewDeck = () => {
  navigation = useNavigation()
  const firebase = useFirebase()
  useFirebaseConnect(`types`)
  const types = useSelector(state => createList(state.firebase.data.types))

  useEffect(() => {
    getPermissionAsync();
  }, [])

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState(null)
  const [type, setType] = useState('')
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)



  saveNewDeck = async () => {
    setLoading(true)
    let newDeckKey = firebase.database().ref().child('decks').push().key;
    let imagePath = null
    if (image !== null) {
      imagePath = `decksBackgrounds/${newDeckKey}.jpg`
      const imageRef = firebase.storage().ref(imagePath)
      await saveImageToStorage(imageRef, image)
    }
    const newDeck = formatNewDeck(newDeckKey,author, title, description, type, imagePath)
    firebase.update('decks', { [newDeckKey]: newDeck })
    setLoading(false)
    navigation.goBack();
  }


  openActionSheet = () => {
    let buttons = ANDROID_BUTTONS
    if (Platform.OS === 'ios') {
      buttons = IOS_BUTTONS
    }
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Select Your image"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          getImageFromCamera().then((result) =>
          setImage(result))
        }
        if (buttonIndex === 1) {
          getImageFromRoll().then((result) =>
          setImage(result))
        }
      }
    )
  }


  return (
    <Container>
      <Content>
        {loading &&  <Spinner />}
        <Form>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input
              getRef={(input) => { this.textInput = input }}
              onChangeText={text => setTitle(text)}
              value={title}
            />
          </Item>
          <Item floatingLabel>
            <Label>Description</Label>
            <Input
              getRef={(input) => { this.textInput = input }}
              onChangeText={text => setDescription(text)}
              value={description}
            />
          </Item>
          <Item floatingLabel>
            <Label>Author</Label>
            <Input
              getRef={(input) => { this.textInput = input }}
              onChangeText={text => setAuthor(text)}
              value={author}
            />
          </Item>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => openActionSheet()}>
              <Text>Select an image for your deck</Text>
            </Button>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
          </View>
          <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select your deck Type"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={type}
              onValueChange={setType}
            >
              {types.map((type) => (
                <Picker.Item key={type.id} label={type.name} value={type.id} />
              ))}
            </Picker>
            <Button
            onPress={() => saveNewDeck()}>
            <Text>Create new Deck</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})