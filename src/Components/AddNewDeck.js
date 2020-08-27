import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/native'
import 'firebase/storage'
import { Container, Content, Form, Item, Input, Label, Text, ActionSheet, Button, Spinner, Picker, Icon } from 'native-base';
import { saveImageToStorage, getPermissionAsync, getImageFromCamera, getImageFromRoll, createList, formatNewDeck } from '../Utilities/helperFunctions';
import { ANDROID_BUTTONS, IOS_BUTTONS, CANCEL_INDEX } from '../Utilities/Constants'

export default AddNewDeck = () => {
  // get info from navigation
  navigation = useNavigation()
  // get info from firebase database
  const firebase = useFirebase()
  useFirebaseConnect(`topics`)
  const topics = useSelector(state => createList(state.firebase.data.topics))
  const auth = useSelector(state => state.firebase.auth)
  const userId = auth.uid
  const loggedAuthor = useSelector(state => state.firebase.profile.name)
  const [hasPermission, setHasPermission] = useState(null)

  // check if user has permissions for camera and roll
  useEffect(() => {
    setHasPermission(getPermissionAsync());
  }, [])

  // create variables for inputs
  const [author, setAuthor] = useState(loggedAuthor) // author initial author is logged profile name
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState(null)
  const [topic, setTopic] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  saveNewDeck = async () => {
    // check if there´s no empty element
    if (author === '' || title === '' || description === '' || topic === '') {
      Alert.alert(
        "Warning",
        "Please fill all the required info",
        [
          {
            text: "OK",
            style: "cancel"
          },
        ],
        { cancelable: true }
      );
    } else {
      setLoading(true)
      // Create reference for new card
      let newDeckKey = firebase.database().ref().child('decks').push().key;
      let imagePath = null
      // check if there´s image to save in Firebase Store
      if (image !== null) {
        imagePath = `decksBackgrounds/${newDeckKey}.jpg`
        const imageRef = firebase.storage().ref(imagePath)
        await saveImageToStorage(imageRef, image)
      }
      // save new deck, update firebase and return to decklist
      const newDeck = formatNewDeck(newDeckKey, author, title, description, topic, imagePath, userId)
      firebase.update('decks', { [newDeckKey]: newDeck })
      setLoading(false)
      navigation.goBack();
    }
  }

  // open actionsheet to select camera or roll
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

  // test for permissions to avoid showing the elements for someone that have none
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return (
      <Content contentContainerStyle={styles.noPermissionMessage}>
        <Text>No access to camera!!</Text>
      </Content>)
  } else {
    return (
      <Container>
        <Content>
          {/* when loading show a spinner */}
          {loading && <Spinner color='blue' />}
          {!loading &&
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
          }
        </Content>
      </Container>
    )
  }
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
  imageSize: {
    width: 300,
    height: 200
  },
  noPermissionMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageText: {
    fontSize: 20,
    fontWeight: '200'
  }
})