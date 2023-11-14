/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ingredients from '../DetailIngredients';
import VideoStep from '../VideoStep';

const Tab = createMaterialTopTabNavigator();

const DetailRecipe = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Image
          source={{
            uri: 'https://static.toiimg.com/thumb/60018142.cms?width=1200&height=900',
          }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.foodName}>Sandwich with Egg</Text>
          <Text style={styles.author}>By Chef Round Homson</Text>
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
            <Tab.Screen name="Ingredients" component={Ingredients} />
            <Tab.Screen name="VideoStep" component={VideoStep} />
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
    width: 149,
  },
  foodName: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  author: {
    color: 'black',
    fontSize: 12,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    height: '50%', // adjust this value as needed
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
