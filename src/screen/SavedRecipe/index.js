/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardRecipe from '../../components/CardRecipe';

const SavedRecipe = ({navigation}) => {
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
      <View style={styles.content}>
        <CardRecipe
          uri="https://res.cloudinary.com/dlveexbli/image/upload/v1695370265/hluqc0yxgmibijqpjovx.png"
          foodName="Margherita"
          store="In Veg Pizza"
          foodCategory="Spicy"
        />
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
