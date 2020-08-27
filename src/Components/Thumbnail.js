import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { StyleSheet, View, Image, Platform } from 'react-native'
import { SvgUri } from 'react-native-svg'
import {  placeholder } from '../Assets'

export default Thumbnail = (props) => {
  // get the topic from props and firebase redux - have already been loader
  const topic = useSelector(state => state.firebase.data.topics[props.topic])

  // get firebase instance
  const firebase = useFirebase()
  const [iconUrl, setIconUrl] = useState(null)

  // on component render load the thumbnail image
  useEffect(() => {
    getAndLoadHttpUrl()
  }, [topic])

  async function getAndLoadHttpUrl() {
    // get the reference from firebase
    const iconreference = firebase.storage().ref(topic.icon);
    // download and setimage to url
    iconreference.getDownloadURL().then(url => {
      setIconUrl(url)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    iconUrl === null ?
      <Image source={placeholder} style={styles.thumbnailContainer}/> :
      <View style={[{ backgroundColor: [topic.backgroundColor] }, styles.thumbnailContainer]} >
        <SvgUri
          style={{ marginTop: 4 }}
          width='80%'
          height='80%'
          fill='black'
          uri={iconUrl}/>
    </View>
  )
}

const styles = StyleSheet.create({

  thumbnailContainer: {
    margin: 'auto',
    alignContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: 60,
        width: 60,
        padding: 4,
        margin: 3,
        borderRadius: 10
      },
      android: {
        height: 56,
        width: 56,
        borderRadius: 50
      }
    }),
  },
})
