/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardRecipe from '../../components/CardRecipe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LikedRecipe = ({navigation}) => {
  const [likedRecipe, setLikedRecipe] = React.useState([]);

  React.useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const users_id = await AsyncStorage.getItem('users_id');
        const response = await axios.get(
          `${process.env.API_URL}/liked/users/${users_id}`,
        );
        setLikedRecipe(response.data.message.rows);
        console.log('liked recipe', response.data.message.rows);
      } catch (error) {
        console.log('failed to fetchLikedRecipes', error);
      }
    };
    fetchLikedRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Liked Recipe</Text>
      </View>
      <FlatList
        data={likedRecipe}
        keyExtractor={item => item.recipes_id}
        renderItem={({item}) => (
          <View style={styles.content}>
            <CardRecipe
              uri={item.recipe_image}
              foodName={item.food_name}
              store={item.user_name}
              foodCategory="Spicy"
            />
          </View>
        )}
      />
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
  title: {
    marginLeft: 88,
    color: '#EEC302',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    paddingTop: 35,
  },
});

export default LikedRecipe;
