/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardRecipe from '../../components/CardRecipe';
import {LikeSave} from '../../components';

const DetailPopularMenu = ({navigation}) => {
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
        <Text style={styles.title}>Popular Menu</Text>
      </View>
      <View style={styles.listPopular}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailRecipe')}
          style={styles.content}>
          <CardRecipe
            uri="https://res.cloudinary.com/dlveexbli/image/upload/v1695370265/hluqc0yxgmibijqpjovx.png"
            foodName="Banana Lemonilo"
            store="In Veg Pizza"
            foodCategory="Breakfast"
          />
        </TouchableOpacity>
        <View>
          <LikeSave />
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
  title: {
    marginLeft: 88,
    color: '#EEC302',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listPopular: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  content: {
    padding: 16,
    paddingTop: 35,
  },
});

export default DetailPopularMenu;
