import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base';

export default function DeckDetail(props) {
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>
                {props.deck.title}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})
