import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase, sto } from 'react-redux-firebase'
import 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { Image, View } from 'react-native'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Container, Content, Form, Item, Input, Label, Text, ActionSheet, Button } from 'native-base';
import { formatNewCard } from '../Utilities/helperFunctions';
import { useNavigation } from '@react-navigation/native'

const IOS_BUTTONS = ["Camera", "Images", "Cancel"];

const ANDROID_BUTTONS = [
  { text: "Camera", icon: "md-camera", iconColor: "#2c8ef4" },
  { text: "Images", icon: "md-images", iconColor: "#006600" },
  { text: "Cancel", icon: "close", iconColor: "#cc0000" }
];

const CANCEL_INDEX = 2

export default AddNewCard = ({ route }) => {
  navigation = useNavigation()
  const { deckId } = route.params
  const firebase = useFirebase()
  useFirebaseConnect(`decks/${deckId}`)
  const cards = useSelector(state => state.firebase.data.decks[deckId].cards)

  useEffect(() => {
    getPermissionAsync();
  }, [])

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [questionImage, setQuestionImage] = useState(null)
  const [answerImage, setAnswerImage] = useState(null)


  saveNewCard = () => {

    let newCardKey = firebase.database().ref().child(`decks/${deckId}/cards`).push().key;
    let questionImagePath = null
    let answerImagePath = null


    if (questionImage !== null) {
      questionImagePath = `questions/${newCardKey}.jpg`
      const questionImageRef = firebase.storage().ref(questionImagePath)
      saveImageToStorage(questionImagePath, questionImage)
    }
    if (answerImage !== null) {
      answerImagePath = null `questions/${newCardKey}.jpg`
      const answerImageRef = firebase.storage().ref(answerImagePath)
      saveImageToStorage(questionImagePath, answerImage)
    }
    const newCard = formatNewCard(question, answer, questionImage, answerImage)
    firebase.update(`decks/${deckId}/cards`, { ...cards, [newCardKey]: newCard })
    navigation.goBack();
  }

  saveImageToStorage = (path, imageUri) => {
    imageUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    return firebase.uploadFiles(path, imageUri)
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { colectionStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (colectionStatus !== 'granted') {
        alert('Sorry, we need cameraroll permissions to make this work!');
      }
    }
  };

  getImageFromRoll = async (type) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        if (type === 'question') {
          setQuestionImage(result.uri)
        }
        if (type === 'answer') {
          setAnswerImage(result.uri)
        }
      }
    } catch (E) {
      console.log(E);
    }
  }

  getImageFromCamera = async (type) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        if (type === 'question') {
          setQuestionImage(result.uri)
        }
        if (type === 'answer') {
          setAnswerImage(result.uri)
        }
      }
    } catch (E) {
      console.log(E);
    }
  }

  openActionSheet = (type) => {
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
          getImageFromCamera(type)
        }
        if (buttonIndex === 1) {
          getImageFromRoll(type)
        }
      }
    )
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Question</Label>
            <Input
              getRef={(input) => { this.textInput = input }}
              onChangeText={text => setQuestion(text)}
              value={question}
            />
          </Item>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => openActionSheet('question')}>
              <Text>Select an image for your question</Text>
            </Button>
            {questionImage && <Image source={{ uri: questionImage }} style={{ width: 300, height: 200 }} />}
          </View>
        </Form>
        <Form>
          <Item floatingLabel last>
            <Label>Answer</Label>
            <Input
              getRef={(input) => { this.textInput = input }}
              onChangeText={text => setAnswer(text)}
              value={answer}
            />
          </Item>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => openActionSheet('answer')}>
              <Text>Select an image for your answer</Text>
            </Button>
            {answerImage && <Image source={{ uri: answerImage }} style={{ width: 300, height: 200 }} />}
          </View>
          <Button
            onPress={() => saveNewCard()}>
            <Text>Add this card to deck</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})
