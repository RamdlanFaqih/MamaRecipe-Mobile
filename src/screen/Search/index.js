/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {Input} from '../../components';
import axios from 'axios';
import CardRecipe from '../../components/CardRecipe';

function Search({navigation}) {
  const [data, setData] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchRecipes = async (query, sortOption) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/recipes?search=${query}&sort=${sortOption}`,
      );
      setData(response.data.data.rows);
      console.log('Fetched Data:', response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchRecipes(searchQuery, 'someSortOption');
    console.log('Search Query:', searchQuery);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Input
            placeholder="Search Pasta, Bread, etc"
            iconName="magnify"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.recipes_id}
          renderItem={({item}) => (
            <View style={styles.content}>
              <CardRecipe
                uri={item.image}
                foodName={item.food_name}
                store="In Veg Pizza"
                foodCategory="Spicy"
                onChangeText={text => setSearchQuery(text)}
                onSubmitEditing={handleSearch}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 25, marginTop: 16, backgroundColor: '#fff'},
  newRecipe: {marginTop: 41},
  sectionText: {fontSize: 18, fontWeight: 'bold', color: '#3F3A3A'},
  content: {marginTop: 20},
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

export default Search;
