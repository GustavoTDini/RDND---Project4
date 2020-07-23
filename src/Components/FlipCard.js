import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Animated, Button } from 'react-native'

export default function FlipCard(props) {


  let value = 0;
  let animatedValue = new Animated.Value(0);

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })


  useEffect(() => {
    value = 0;
    animatedValue = new Animated.Value(0);
    animatedValue.addListener(({ value }) => {
      value = value;
    })
    frontInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    backInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }, [])

  const flipCard = () => {
    if (value >= 90) {
      // Animated.spring(animatedValue, {
      //   toValue: 0,
      //   friction: 8,
      //   tension: 10
      // }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
        
      }).start();
    }
  }
  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate }
    ]
  }
  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate }
    ]
  }

  return (
    <View>
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.flipText}>
            {props.question}
          </Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <Text style={styles.flipText}>
            {props.answer}
          </Text>
        </Animated.View>
      </View>
      <Button
        title="Show Answer"
        onPress={() => flipCard()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 400,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  }
});



