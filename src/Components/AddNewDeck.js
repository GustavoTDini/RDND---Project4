import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import 'firebase/storage'
import { Container, Content, Form, Item, Input, Label, Text, ActionSheet, Button, Spinner, Picker, Icon } from 'native-base';
import { saveImageToStorage, getPermissionAsync, getImageFromCamera, getImageFromRoll, createList, formatNewDeck } from '../Utilities/helperFunctions';
import { useNavigation } from '@react-navigation/native'
import { ANDROID_BUTTONS, IOS_BUTTONS, CANCEL_INDEX } from '../Utilities/Constants'

export default AddNewDeck = () => {
  navigation = useNavigation()
  const firebase = useFirebase()
  useFirebaseConnect(`topics`)
  const topics = useSelector(state => createList(state.firebase.data.topics))
  const auth = useSelector(state => state.firebase.auth)
  const userId = auth.uid
  const loggedAuthor = useSelector(state => state.firebase.profile.name)

  useEffect(() => {
    getPermissionAsync();
  }, [])

  const [author, setAuthor] = useState(loggedAuthor)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState(null)
  const [topic, setTopic] = useState('')
  const [image, setImage] = useState(null)
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
    const newDeck = formatNewDeck(newDeckKey, author, title, description, topic, imagePath, userId)
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
        {loading && <Spinner color='blue'/>}
        <Form>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input
              onChangeText={text => setTitle(text)}
              value={title}
            />
          </Item>
          <Item floatingLabel>
            <Label>Description</Label>
            <Input
              onChangeText={text => setDescription(text)}
              value={description}
            />
          </Item>
          <Item floatingLabel>
            <Label>Author</Label>
            <Input
              onChangeText={text => setAuthor(text)}
              value={author}
            />
          </Item>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select your deck topic"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={topic}
            onValueChange={setTopic}
            style={styles.picker}
          >
            {topics.map((topic) => (
              <Picker.Item key={topic.id} label={topic.name} value={topic.id} />
            ))}
          </Picker>
          <View style={styles.imageBlock}>
            <Button
              block
              style={styles.button}
              onPress={() => openActionSheet()}>
              <Text>Select an image for your deck</Text>
            </Button>
            {image && <Image source={{ uri: image }} style={styles.imageSize} />}
          </View>
          <Button
            style={styles.button}
            block
            transparent={Platform.OS === 'ios' ? true : false}
            onPress={() => saveNewDeck()}>
            <Text>Create new Deck</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20
  },
  picker: {
    marginTop: 20
  },
  imageBlock: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  imageSize:{
    width: 300, 
    height: 200
  }
})