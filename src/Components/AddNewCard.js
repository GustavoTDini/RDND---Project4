import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Platform, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { useNavigation, useRoute } from '@react-navigation/native'
import 'firebase/storage'
import { Container, Content, Form, Item, Input, Label, Text, ActionSheet, Button, Spinner } from 'native-base';
import { formatNewCard, saveImageToStorage, getPermissionAsync, getImageFromCamera, getImageFromRoll } from '../Utilities/helperFunctions';
import { ANDROID_BUTTONS, IOS_BUTTONS, CANCEL_INDEX } from '../Utilities/Constants'

export default AddNewCard = () => {
  // get info from navigation
  navigation = useNavigation()
  route = useRoute()
  const { deckId } = route.params
  const firebase = useFirebase()
  // get info from firebase database
  useFirebaseConnect(`decks/${deckId}`)
  const cards = useSelector(state => state.firebase.data.decks[deckId].cards)
  const [hasPermission, setHasPermission] = useState(null)

  // check if user has permissions for camera and roll
  useEffect(() => {
    setHasPermission(getPermissionAsync());
  }, [])

  // create variables for inputs
  const [question, setQuestion] = useState(' ')
  const [answer, setAnswer] = useState(' ')
  const [questionImage, setQuestionImage] = useState(null)
  const [answerImage, setAnswerImage] = useState(null)
  const [loading, setLoading] = useState(false)

  saveNewCard = async () => {
    // check if at least has one question ans one answer element
    if ((question === ' ' && questionImage === null) || (answer === ' ' && answerImage === null)) {
      Alert.alert(
        "Warning",
        "Please fill at least one question item and one answer item",
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
      let newCardKey = firebase.database().ref().child(`decks/${deckId}/cards`).push().key;
      let questionImagePath = null
      let answerImagePath = null
      // check if there´s image to save in Firebase Store
      if (questionImage !== null) {
        questionImagePath = `questions/${newCardKey}.jpg`
        const questionImageRef = firebase.storage().ref(questionImagePath)
        await saveImageToStorage(questionImageRef, questionImage)
      }
      if (answerImage !== null) {
        answerImagePath = `answers/${newCardKey}.jpg`
        const answerImageRef = firebase.storage().ref(answerImagePath)
        await saveImageToStorage(answerImageRef, answerImage)
      }
      // save new card, update firebase and return to deckDetail
      const newCard = formatNewCard(newCardKey, question, answer, questionImagePath, answerImagePath)
      firebase.update(`decks/${deckId}/cards`, { ...cards, [newCardKey]: newCard })
      setLoading(false)
      navigation.goBack();
    }
  }

  // open actionsheet to select camera or roll
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
          getImageFromCamera().then((result) =>
            type === 'question' ? setQuestionImage(result) : setAnswerImage(result))
        }
        if (buttonIndex === 1) {
          getImageFromRoll().then((result) =>
            type === 'question' ? setQuestionImage(result) : setAnswerImage(result))
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
                <Label>Question</Label>
                <Input
                  onChangeText={text => setQuestion(text)}
                  value={question}
                />
              </Item>
              <View style={styles.imageBlock}>
                <Button
                  style={styles.button}
                  block
                  onPress={() => openActionSheet('question')}>
                  <Text>Select an image for your question</Text>
                </Button>
                {questionImage && <Image source={{ uri: questionImage }} style={styles.imageSize} />}
              </View>
              <Item floatingLabel last>
                <Label>Answer</Label>
                <Input
                  onChangeText={text => setAnswer(text)}
                  value={answer}
                />
              </Item>
              <View style={styles.imageBlock}>
                <Button
                  style={styles.button}
                  block
                  onPress={() => openActionSheet('answer')}>
                  <Text>Select an image for your answer</Text>
                </Button>
                {answerImage && <Image source={{ uri: answerImage }} style={styles.imageSize} />}
              </View>
              <Button
                style={styles.button}
                block
                transparent={Platform.OS === 'ios' ? true : false}
                onPress={() => saveNewCard()}>
                <Text>Add this card to deck</Text>
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
