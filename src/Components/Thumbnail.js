import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { StyleSheet, View, Image, Platform } from 'react-native'
import { SvgUri } from 'react-native-svg'
import {  placeholder } from '../Utilities/assets'

export default Thumbnail = (props) => {
  const type = useSelector(state => state.firebase.data.types[props.type])

  const firebase = useFirebase()
  const [iconUrl, setIconUrl] = useState(null)

  useEffect(() => {
    getAndLoadHttpUrl()
  }, [type])

  async function getAndLoadHttpUrl() {
    const iconreference = firebase.storage().ref(type.icon);
    iconreference.getDownloadURL().then(url => {
      setIconUrl(url)
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    iconUrl === null ?
      <Image source={placeholder} style={styles.thumbnailContainer}/> :
      <View style={[{ backgroundColor: [type.backgroundColor] }, styles.thumbnailContainer]} >
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
        margin: 2,
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
