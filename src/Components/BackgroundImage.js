import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { useFirebase } from 'react-redux-firebase'
import {  placeholder } from '../Utilities/assets'

export default BackgroundImage = (props) => {
  console.log(props.imageRef)

  const [imageUrl, setImageUrl] = useState(null)
  const firebase = useFirebase()

  useEffect(() => {
    getAndLoadHttpUrl()
  }, [])

  async function getAndLoadHttpUrl() {
    const imageReference = firebase.storage().ref(props.imageRef);
    imageReference.getDownloadURL().then(url => {
      setImageUrl(url)
      console.log(url)
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    imageUrl === null ?
      <Image source={placeholder} style={styles.image}/> :
      <Image source={{uri: imageUrl}} style={styles.image}/>
  )
}


const styles = StyleSheet.create({
  image:{
    width: '100%',
    height: '100%'
  }
})