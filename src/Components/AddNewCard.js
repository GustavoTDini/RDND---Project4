import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import 'firebase/storage'
import { Container, Content, Form, Item, Input, Label, Text, ActionSheet, Button, Spinner } from 'native-base';
import { formatNewCard, saveImageToStorage, getPermissionAsync, getImageFromCamera, getImageFromRoll } from '../Utilities/helperFunctions';
import { useNavigation } from '@react-navigation/native'
import { ANDROID_BUTTONS, IOS_BUTTONS, CANCEL_INDEX } from '../Utilities/Constants'

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
  const [loading, setLoading] = useState(false)


  saveNewCard = async () => {
    setLoading(true)
    let newCardKey = firebase.database().ref().child(`decks/${deckId}/cards`).push().key;
    let questionImagePath = null
    let answerImagePath = null
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
    const newCard = formatNewCard(newCardKey, question, answer, questionImagePath, answerImagePath)
    firebase.update(`decks/${deckId}/cards`, { ...cards, [newCardKey]: newCard })
    setLoading(false)
    navigation.goBack();
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


  return (
    <Container>
      <Content>
        {loading && <Spinner />}
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
        </Form>
        <Form>
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
      </Content>
    </Container>
  )
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
  imageSize:{
    width: 300, 
    height: 200
  }
})
