import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, Header, Left,Thumbnail, Button, Icon } from 'native-base';

export default function DeckDetail({route, navigation}) {
  const {deckId} = route.params;
  const deckTitle = 'Title'

  const navigateToAddCard = () => (
    navigation.navigate('AddNewCard', {
      deckId: deckId
    })
  )

    const navigateToCards = () => (
      navigation.navigate('SwipeCards', {
      deckId: deckId,
      deckTitle: deckTitle
    })
  )

  return (
    <Container>
    <Content>
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: 'https://liferay.github.io/lexiconcss/images/thumbnail_placeholder.gif'}} />
            <Body>
              <Text>{deckId}</Text>
              <Text note>April 15, 2016</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{uri: 'https://liferay.github.io/lexiconcss/images/thumbnail_placeholder.gif'}} style={{height: 200, width: 200, flex: 1}}/>
            <Text>
              //Your text here
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="logo-github" />
              <Text>1,926 stars</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
      <Button
        onPress={()=> navigateToCards()}>
        <Text>Start Deck</Text>
        </Button>
      <Button>
        <Text>Delete Deck</Text>
      </Button>
      <Button
        onPress={()=> navigateToAddCard()}>
        <Text>Add Card</Text>
      </Button>
    </Content>
  </Container>
  )
}

const styles = StyleSheet.create({})
