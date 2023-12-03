/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardRecipe from '../../components/CardRecipe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SavedRecipe = ({navigation}) => {
  const [savedRecipe, setSavedRecipe] = React.useState([]);

  React.useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const users_id = await AsyncStorage.getItem('users_id');
        const response = await axios.get(
          `${process.env.API_URL}/saved/users/${users_id}`,
        );
        setSavedRecipe(response.data.message.rows);
        console.log('saved recipe', response.data.message.rows);
      } catch (error) {
        console.log('failed to fetchSavedRecipes', error);
      }
    };
    fetchSavedRecipes();
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
        <Text style={styles.title}>Saved Recipe</Text>
      </View>
      <FlatList
        data={savedRecipe}
        keyExtractor={item => item.recipes_id}
        renderItem={({item}) => (
          <View style={styles.content}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailRecipe', {recipes_id : item.recipes_id})}>
              <CardRecipe
                uri={item.recipe_image}
                foodName={item.food_name}
                store={item.user_name}
                // foodCategory="Spicy"
              />
            </TouchableOpacity>
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

export default SavedRecipe;
