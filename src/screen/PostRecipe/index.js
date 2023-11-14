/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../components';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const PostRecipe = ({navigation}) => {
  const [data, setData] = React.useState({
    food_name: '',
    ingredients: '',
    video: '',
    video_title: '',
    food_category: '',
  });
  const [image, setImage] = React.useState(null);

  const chooseImageFromGallery = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response);
      }
    });
  };

  const handlePostRecipe = () => {
    const formData = new FormData();
    formData.append('food_name', data.food_name);
    formData.append('ingredients', data.ingredients);
    if (image) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }
    formData.append('video_title', data.video_title);
    formData.append('video', data.video);
    formData.append('food_category', data.food_category);
    formData.append('users_id', data.users_id);

    axios
    .post(`${process.env.API_URL}/food/addrecipes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Status Code:', response.status);
      console.log('Server Response:', response.data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titleText}>Add Your Recipe</Text>
        </View>
        <Input
          placeholder="Title"
          iconName="book-open-page-variant-outline"
          onChangeText={text => setData({...data, food_name: text})}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Food Category"
          onChangeText={text => setData({...data, food_category: text})}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Ingredients"
          onChangeText={text => setData({...data, ingredients: text})}
        />
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={chooseImageFromGallery}>
          <Text style={styles.buttonText}>Pick Image from Gallery</Text>
        </TouchableOpacity>
        {image && image.uri && (
          <Image source={{uri: image.uri}} style={styles.previewImage} />
        )}
        <TextInput
          style={styles.textArea}
          placeholder="Video Title"
          onChangeText={text => setData({...data, video_title: text})}
        />
        <Input
          placeholder="Add Video URL"
          iconName="video-outline"
          onChangeText={text => setData({...data, video: text})}
        />
        <TouchableOpacity style={styles.button} onPress={handlePostRecipe}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
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
