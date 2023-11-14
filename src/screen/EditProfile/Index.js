/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
const EditProfile = ({navigation, route}) => {
  const { userId } = route.params;
  const [response, setResponse] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  console.log('User ID in EditProfile page:', userId);
  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const requestPermissions = async () => {
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('access successfully granted');
        cameraLaunch();
      } else {
        console.log('access failure');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cameraLaunch = () => {
    ImagePicker.launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'mixed',
        includeBase64: false,
      },
      res => {
        console.log('response camera = ', res);
        if (res.didCancel) {
          console.log('user cancel image');
        } else if (res.errorMessage) {
          console.log('Image Picker Error');
        } else {
          const data = res.assets[0];
          console.log(data);
          setResponse(data);
        }
      },
    );
  };
  const galleryLaunch = () => {
    ImagePicker.launchImageLibrary(
      {
        saveToPhotos: true,
        mediaType: 'mixed',
        includeBase64: false,
      },
      res => {
        console.log('response library = ', res);
        if (res.didCancel) {
          console.log('user cancel library');
        } else if (res.errorMessage) {
          console.log('Image Picker Error');
        } else {
          const data = res.assets[0];
          console.log(data);
          setResponse(data);
        }
      },
    );
  };
  const handleSubmit = () => {
    let data = {
      image: {
        uri: response?.uri ?? '',
        type: response?.type ?? '',
        name: response?.fileName ?? '',
        fileSize: response?.fileSize ?? '',
      },
    };

    const formData = new FormData();
    formData.append('image', data?.image);

    axios
      .put(`${process.env.API_URL}/updateProfilePicture/${userId}`, formData)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigation.goBack();
        } else {
          console.log('Update Failed', res.status);
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                requestPermissions();
                hideModal();
              }}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                galleryLaunch();
                hideModal();
              }}>
              <Text style={styles.buttonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={hideModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.editProfile}>Edit Profile</Text>
      </View>
      <View style={styles.option}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionName} onPress={showModal}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>
        {response && (
          <>
            <Image
              source={{uri: response.uri}}
              style={{width: 100, height: 100}}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.optionName}>Apply Profile Picture</Text>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.optionItem}>
          <Text style={styles.optionName}>Change Password</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingLeft: 24,
  },
  editProfile: {
    marginLeft: 88,
    color: '#EEC302',
    fontSize: 20,
    fontWeight: 'bold',
  },
  back: {
    backgroundColor: 'lightgrey',
    borderRadius: 16,
  },
  option: {
    padding: 28,
    gap: 22,
  },
  optionItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#E7E7E7',
  },
  optionName: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    padding: 35,
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 40,
    marginTop: 10,
  },
  buttonCancel: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 40,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditProfile;
