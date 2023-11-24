/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const PostRecipe = ({navigation}) => {
  const [recipes, setRecipes] = React.useState({
    image: '',
    food_name: '',
    ingredients: '',
    video_title: '',
    video: '',
    users_id: '',
  });
  const [response, setResponse] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem('users_id').then(value => {
      setRecipes({...recipes, users_id: value});
    });
  }, []);

  const handleChange = (field, text) => {
    setRecipes({
      ...recipes,
      [field]: text,
    });
  };
  console.log(recipes);
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

  const handleSumbit = () => {
    const formData = new FormData();

    formData.append('food_name', recipes.food_name);
    formData.append('ingredients', recipes.ingredients);
    formData.append('video_title', recipes.video_title);
    formData.append('video', recipes.video);
    formData.append('users_id', recipes.users_id);

    if (response && response.uri) {
      formData.append('image', {
        uri: response?.uri ?? '',
        type: response?.type ?? '',
        name: response?.fileName ?? '',
        fileSize: response?.fileSize ?? '',
      });
    }
    axios
    .post(`${process.env.API_URL}/recipes/tambahproduct`, formData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.response);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titleText}>Add Your Recipe</Text>
        </View>
        <View>
          <Input
            placeholder="Title"
            iconName="book-open-page-variant-outline"
            value={recipes.food_name}
            onChangeText={text => handleChange('food_name', text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Ingredients"
            value={recipes.ingredients}
            onChangeText={text => handleChange('ingredients', text)}
          />
          <TouchableOpacity
            onPress={() => {
              galleryLaunch();
            }}
            style={styles.imagePickerButton}>
            <Text style={styles.buttonText}>Pick Image from Gallery</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textArea}
            placeholder="Video Title"
            value={recipes.video_title}
            onChangeText={text => handleChange('video_title', text)}
          />
          <Input
            placeholder="Add Video URL"
            iconName="video-outline"
            value={recipes.video}
            onChangeText={text => handleChange('video', text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSumbit}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    alignItems: 'center',
    padding: 30,
  },
  titleText: {
    color: '#EFC81A',
    fontSize: 24,
  },
  textArea: {
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  imagePickerButton: {
    backgroundColor: '#EFC81A',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#EFC81A',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PostRecipe;
