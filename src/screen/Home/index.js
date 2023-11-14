/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../components';
import CardImage from '../../components/CardImage/Index';
import CardCategory from '../../components/CardCategory';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

function HomeScreen({navigation}) {
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    axios
      .get(`${process.env.API_URL}/recipes`)
      .then(response => {
        setData(response.data.data.rows);
        console.log(response.data.data.rows);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    console.log('Navigating to Search');
    navigation.navigate('Search');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Input placeholder="Search Pasta, Bread, etc" iconName="magnify" onPressIn={handleSearch} />
        <View style={styles.newRecipe}>
          <Text style={styles.sectionText}>New Recipes</Text>
          <ScrollView style={styles.content}>
            <FlatList
              horizontal
              data={data}
              keyExtractor={item => item.recipes_id}
              renderItem={({item}) => (
                <CardImage uri={item.image} text={item.food_name} />
              )}
            />
          </ScrollView>
        </View>
        <View style={styles.popularRecipe}>
          <View style={styles.popularRecipeText}>
            <Text style={styles.sectionText}>Popular Recipes</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailPopularMenu')}
              style={styles.section}>
              <Text style={styles.sectionInfo}>More Info</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <CardCategory
              backgroundColor="#FDE901"
              iconName="silverware-fork-knife"
              iconColor="#000"
            />
            <View style={styles.details}>
              <View>
                <Text style={styles.foodName}>Orange La Pasta</Text>
              </View>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="star" size={12} color="#FFB200" />
                <Text style={styles.rate}>4.6 - </Text>
                <Text style={styles.foodCategory}>Pasta</Text>
              </View>
            </View>
          </View>
          <View style={styles.category}>
            <CardCategory
              backgroundColor="#57CE96"
              iconName="pot-steam"
              iconColor="#000"
            />
            <View style={styles.details}>
              <View>
                <Text style={styles.foodName}>Spicy Ramenyu</Text>
              </View>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="star" size={12} color="#FFB200" />
                <Text style={styles.rate}>4.4 - </Text>
                <Text style={styles.foodCategory}>Korean</Text>
              </View>
            </View>
          </View>
          <View style={styles.category}>
            <CardCategory
              backgroundColor="#000001"
              iconName="fish"
              iconColor="#000"
            />
            <View style={styles.details}>
              <View>
                <Text style={styles.foodName}>Lobster Toast</Text>
              </View>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="star" size={12} color="#FFB200" />
                <Text style={styles.rate}>4.4 - </Text>
                <Text style={styles.foodCategory}>Seafood</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 25, marginTop: 16, backgroundColor: '#fff'},
  newRecipe: {marginTop: 41},
  sectionText: {fontSize: 18, fontWeight: 'bold', color: '#3F3A3A'},
  content: {marginTop: 10},
  popularRecipe: {marginTop: 30},
  popularRecipeText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionInfo: {color: '#6D61F2'},
  category: {
    marginTop: 30,
    flexDirection: 'row',
    columnGap: 5,
  },
  details: {
    justifyContent: 'center',
    gap: 10,
    marginLeft: 5,
  },
  foodName: {fontSize: 18, color: '#18172B', fontWeight: 'bold'},
  rating: {flexDirection: 'row'},
  rate: {color: '#18172B', fontWeight: 'bold'},
});

export default HomeScreen;
