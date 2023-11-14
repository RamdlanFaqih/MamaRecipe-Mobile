/* eslint-disable prettier/prettier */

import ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permissions',
        message: 'App need Camera',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
        buttonNeutral: 'Ask Me Later',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const launchCamera = async (setResponse) => {
  const hasCameraPermission = await requestCameraPermission();
  if (hasCameraPermission) {
    ImagePicker.launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'mixed',
        includeBase64: false,
      },
      (response) => handleImagePickerResponse(response, setResponse)
    );
  } else {
    console.log('Camera permission denied');
  }
};

const launchGallery = () => {
  ImagePicker.launchImageLibrary(
    {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeBase64: false,
    },
    (response) => handleImagePickerResponse(response, setResponse)
  );
};

const handleImagePickerResponse = (response, setResponse) => {
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.errorMessage) {
    console.log('Image Picker Error: ', response.errorMessage);
  } else {
    const selectedImage = response.assets[0];
    console.log(selectedImage);
    setResponse(selectedImage);
  }
};

export { launchCamera, launchGallery };
