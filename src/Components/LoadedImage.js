import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { useFirebase } from 'react-redux-firebase'
import { placeholder } from '../Assets'

export default LoadedImage = (props) => {
  // get image ref from props
  const { imageRef } = props
  const [imageUrl, setImageUrl] = useState(null)
  const firebase = useFirebase()

  // on component render load the image
  useEffect(() => {
    getAndLoadHttpUrl()
  }, [])

  async function getAndLoadHttpUrl() {
    // get the reference from firebase
    const imageReference = firebase.storage().ref(imageRef);
    // download and setimage to url
    imageReference.getDownloadURL().then(url => {
      setImageUrl(url)
    }).catch(error => {
      console.log(error)
    })
  }

  // if there´s no image to load - show a placeholder
  return (
    imageUrl === null ?
      <Image source={placeholder} style={styles.image} /> :
      <Image source={{ uri: imageUrl }} style={props.type === 'backgroundImage' ? styles.image: styles.cardImage} resizeMode='cover' />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  cardImage:{
    width: 250,
    height: 250,
    ...Platform.select({
      ios:{
        borderRadius: 16,
      },
      android: {
        borderRadius: 4,
      }
    }), 
  }
})