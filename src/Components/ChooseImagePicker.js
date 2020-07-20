import React, { useEffect, useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ActionSheet } from "native-base";



export default ChooseImagePicker = (props) => {
  const [image, setimage] = useState(null)

  useEffect(() => {
    getPermissionAsync();
  }, [])

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { colectionStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (colectionStatus !== 'granted') {
        alert('Sorry, we need cameraroll permissions to make this work!');
      }
    }
  };

  getImageFromRoll = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setimage(result.uri)
        props.setUrl(result.uri)
      }
    } catch (E) {
      console.log(E);
    }
  }

  getImageFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setimage(result.uri)
        props.setUrl(result.uri)
      }
    } catch (E) {
      console.log(E);
    }
  }

  openActionSheet = () => {
    let buttons = ANDROID_BUTTONS
    if (Platform.OS === 'ios') {
      buttons = IOS_BUTTONS
    }
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Select Your image"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          getImageFromCamera()
        }
        if (buttonIndex === 1) {
          etImageFromRoll()
        }
      }
    )
  }

  return (
    
      <Button title={props.buttonMessage} onPress={() => openActionSheet()} />
  );

}