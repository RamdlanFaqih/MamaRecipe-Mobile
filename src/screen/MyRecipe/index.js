/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardRecipe from '../../components/CardRecipe';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyRecipe = ({navigation}) => {
  const [user, setUser] = React.useState('');
  const [recipesId, setRecipesId] = React.useState(null);
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const users_id = await AsyncStorage.getItem('users_id');
        const response = await axios.get(
          `${process.env.API_URL}/users/recipes/${users_id}`,
        );
        console.log(response.data.rows[0]);
        setUser(response.data.rows[0]);

        const recipeResponse = await axios.get(
          `${process.env.API_URL}/recipes/users/${users_id}`,
        );
        console.log(recipeResponse.data.data.rows);
        setRecipes(recipeResponse.data.data.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem('userRecipes', JSON.stringify(recipes));
  }, [recipes]);
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
        <Text style={styles.title}>My Recipe</Text>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={item => item.recipes_id}
        renderItem={({item}) => (
          <View style={styles.content}>
            <CardRecipe
              uri={item.image}
              foodName={item.food_name}
              store={user.user_name}
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

export default MyRecipe;
