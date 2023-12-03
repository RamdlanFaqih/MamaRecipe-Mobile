/* eslint-disable prettier/prettier */

import * as React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ingredients from '../DetailIngredients';
import VideoStep from '../VideoStep';
import {LikeSave} from '../../components';

const Tab = createMaterialTopTabNavigator();

const DetailRecipe = ({navigation, route}) => {
  const {recipes_id} = route.params;
  const [recipes, setRecipes] = React.useState('');
  const [usersId, setUsersId] = React.useState('');
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/recipes/${recipes_id}`,
        );
        console.log(response.data.data.rows);
        setRecipes(response.data.data.rows[0]);
      } catch (error) {
        console.log('Failed to get recipes:', error);
      }
    };
    fetchRecipe();
  }, [recipes_id]);

  React.useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userIdValue = await AsyncStorage.getItem('users_id');
        console.log(userIdValue);
        if (userIdValue !== null) {
          setUsersId(userIdValue);
        }
      } catch (error) {
        console.log('Error retrieving users_id:', error);
      }
    };

    fetchUserId();
  }, []);

  console.log('recipes_id :', recipes_id);
  const handleClickSave = async () => {
    try {
      if (isSaved) {
        const response = await axios.delete(
          `${process.env.API_URL}/saved/unsaved/${usersId}`,
          {
            data: {
              recipes_id: recipes_id,
            },
          }
        );
        console.log('Unsaved Recipe', response);
      } else {
        const response = await axios.post(
          `${process.env.API_URL}/saved/insert/${usersId}`,
          {
            recipes_id: recipes_id,
          }
        );
        console.log('Saved Recipe', response);
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.log(('Error Saving/Unsaving Recipe', error));
    }
  };
  const handleClickLike = async () => {
    try {
      if (isLiked) {
        const response = await axios.delete(
          `${process.env.API_URL}/liked/unlike/${usersId}`,
          {
            data: {
              recipes_id: recipes_id,
            },
          }
        );
        console.log('unliked recipe', response);
      } else {
        const response = await axios.post(
          `${process.env.API_URL}/liked/insert/${usersId}`,
          {
            recipes_id: recipes_id,
          }
        );
        console.log('Liked Recipe', response);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log('Error Like / Unlike Recipe', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Image
          source={{
            uri: recipes.image,
          }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <View style={styles.foodDetail}>
            <Text style={styles.foodName}>{recipes.food_name}</Text>
            <Text style={styles.author}>By Chef Round Homson</Text>
          </View>
          <View style={styles.likeSave}>
            <LikeSave
              isSaved={isSaved}
              isLiked={isLiked}
              onPressLiked={handleClickLike}
              onPressSaved={handleClickSave}
              />
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'grey',
              tabBarIndicatorStyle: {
                backgroundColor: '#EEC302',
              },
              tabBarStyle: {
                elevation: 0,
              },
              tabBarLabelStyle: {
                fontSize: 14,
              },
            }}>
            <Tab.Screen
              name="Ingredients"
              component={() => (
                <Ingredients ingredients={recipes.ingredients} />
              )}
            />
            <Tab.Screen name="VideoStep" component={() => (
              <VideoStep
                navigation={navigation}
                recipeVideo={{
                  title: recipes.video_title,
                  description: recipes.food_name,
                  recipes_id: recipes_id
                }} />
            )} />
          </Tab.Navigator>
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
  product: {
    height: '60%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 133,
    left: 28,
    right: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeSave: {
    paddingTop: 50,
  },
  foodDetail : {
    width: 200,
  },
  foodName: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  author: {
    color: 'white',
    fontSize: 12,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  card: {
    flex: 1,
    padding: 15,
  },
});

export default DetailRecipe;
