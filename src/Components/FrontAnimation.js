import React, { useRef, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Animated } from 'react-native'
import { thumbsUp, thumbsDown, bomb, fireworks, splashIcon } from '../Assets'

const TOTAL_WIDTH = Dimensions.get('window').width;
const TOTAL_HEIGHT = Dimensions.get('window').height;


export default function FrontAnimation(props) {
  const { type } = props

  const splashOpacity = useRef(new Animated.Value(0)).current;
  const splashScale = useRef(new Animated.Value(0)).current;
  const thumbUp = useRef(new Animated.Value(300)).current;
  const thumbDown = useRef(new Animated.Value(-300)).current;
  const fireOpacity = useRef(new Animated.Value(1)).current;
  const fireScale = useRef(new Animated.Value(0)).current;
  const bombScale = useRef(new Animated.Value(1)).current;


  useEffect(() => {

    switch (type) {
      case 'thumbsUp':
        Animated.spring(thumbUp, {
          toValue: -100,
          speed: 10,
          bounciness: 15,
          useNativeDriver: true
        }).start()
        break
      case 'thumbsDown':
        Animated.spring(thumbDown, {
          toValue: 100,
          speed: 10,
          bounciness: 15,
          useNativeDriver: true
        }).start()
        break
      case 'bomb':
        Animated.sequence([
          Animated.spring(bombScale, {
            toValue: 0.8,
            speed: 1.5,
            useNativeDriver: true
          }),
          Animated.spring(bombScale, {
            toValue: 1.2,
            speed: 1.5,
            useNativeDriver: true
          }),
          Animated.timing(bombScale, {
            toValue: 1000,
            timing: 3000,
            useNativeDriver: true
          }),
        ]).start()
        break
      case 'fireworks':
        Animated.timing(fireOpacity, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true
        }).start()
        Animated.timing(fireScale, {
          toValue: 5,
          duration: 5000,
          useNativeDriver: true
        }).start()
        break
      default:
        Animated.timing(splashOpacity, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true
        }).start()
        Animated.spring(splashScale, {
          toValue: 1,
          velocity: 5,
          useNativeDriver: true
        }).start()
    }
  }, []);


  const animatedStyles = {
    splash: {
      ...styles.image,
      opacity: splashOpacity,
      transform: [
        {
          scale: splashScale
        }
      ]
    },
    up: {
      ...styles.image,
      transform: [
        {
          translateY: thumbUp
        }
      ]
    },
    down: {
      ...styles.image,
      transform: [
        {
          translateY: thumbDown
        }
      ]
    },
    fireWorks: {
      ...styles.image,
      opacity: fireOpacity,
      transform: [
        {
          scale: fireScale
        }
      ]
    },
    bomb: {
      ...styles.image,
      transform: [
        {
          scale: bombScale
        }
      ]
    },
  }

  let image = null
  let style = null

  switch (type) {
    case 'thumbsUp':
      image = thumbsUp
      style = animatedStyles.up
      break
    case 'thumbsDown':
      image = thumbsDown
      style = animatedStyles.down
      break
    case 'bomb':
      image = bomb
      style = animatedStyles.bomb
      break
    case 'fireworks':
      image = fireworks
      style = animatedStyles.fireWorks
      break
    default:
      image = splashIcon
      style = animatedStyles.splash

  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={image}
        style={style}
        resizeMode='contain' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
    height: TOTAL_HEIGHT,
    width: TOTAL_WIDTH,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 250,
    height: 250,
  },
})
