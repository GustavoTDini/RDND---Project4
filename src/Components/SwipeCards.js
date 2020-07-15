import React from 'react';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left } from 'native-base';


export default  function SwipeCards({route}) {
  const {deckId, deckTitle} = route.params;
    return (
      <Container>
        <Header />
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