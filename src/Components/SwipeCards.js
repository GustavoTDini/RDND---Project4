import React from 'react';
import {useSelector} from 'react-redux'
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left } from 'native-base';


export default  function SwipeCards({route}) {
  const {deckId, deckTitle} = route.params;

  const cards = useSelector(state => state.decks[deckId].cards)
    return (
      <Container style={{flex:1}}>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: 'https://liferay.github.io/lexiconcss/images/thumbnail_placeholder.gif'}} />
                    <Text>{deckTitle}</Text>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Text>{item.question}</Text>
                  <Text note>{item.answer}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
}