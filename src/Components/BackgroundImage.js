import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { useFirebase } from 'react-redux-firebase'
import { placeholder } from '../Assets'

export default BackgroundImage = (props) => {

  const [imageUrl, setImageUrl] = useState(null)
  const firebase = useFirebase()

  useEffect(() => {
    getAndLoadHttpUrl()
  }, [])

  async function getAndLoadHttpUrl() {
    const imageReference = firebase.storage().ref(props.imageRef);
    imageReference.getDownloadURL().then(url => {
      setImageUrl(url)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    imageUrl === null ?
      <Image source={placeholder} style={styles.image} /> :
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode='cover' />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'

  }
})