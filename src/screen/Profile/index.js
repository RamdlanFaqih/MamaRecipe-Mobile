/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [user, setUser] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('users_id');
      console.log(userId);
      const response = await axios.get(`${process.env.API_URL}/users/${userId}`);
      console.log(response.data.data.rows[0]);
      setUser(response.data.data.rows[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUser()
      .then(() => setRefreshing(false))
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  }, []);

  React.useEffect(() => {
    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
       style={styles.container}
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
       >
      <View style={styles.profile}>
        {user.image ? (
          <Image
            style={styles.image}
            source={{
              uri: user.image,
            }}
          />
        ) : (
          <Image
            source={require('../../assets/icon/user.png')}
            style={styles.logo}
          />
        )}

        <Text style={styles.name}>{user.name}</Text>
      </View>
      </ScrollView>
      <View style={styles.content}>
        <View style={styles.option}>
          <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile', { userId: user.users_id })}
          style={styles.section}
        >
            <View style={styles.leftSection}>
              <FeatherIcon name="user" size={24} color="#EEC302" />
              <Text style={styles.sectionName}>Edit Profile</Text>
            </View>
            <View style={styles.rightSection}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                style={styles.sectionIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyRecipe')}
            style={styles.section}>
            <View style={styles.leftSection}>
              <FeatherIcon name="award" size={24} color="#EEC302" />
              <Text style={styles.sectionName}>My Recipe</Text>
            </View>
            <View style={styles.rightSection}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                style={styles.sectionIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavedRecipe')}
            style={styles.section}>
            <View style={styles.leftSection}>
              <FeatherIcon name="bookmark" size={24} color="#EEC302" />
              <Text style={styles.sectionName}>Saved Recipe</Text>
            </View>
            <View style={styles.rightSection}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                style={styles.sectionIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LikedRecipe')}
            style={styles.section}>
            <View style={styles.leftSection}>
              <AntDesignIcon name="like2" size={24} color="#EEC302" />
              <Text style={styles.sectionName}>Liked Recipe</Text>
            </View>
            <View style={styles.rightSection}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                style={styles.sectionIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EFC81A',
  },
  logo: {
    backgroundColor: '#C4C4C4',
    width: 84,
    height: 84,
    borderRadius: 84,
  },
  profile: {flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60},
  image: {width: 84, height: 84, borderRadius: 84},
  name: {color: '#fff', fontSize: 16, fontWeight: '700', marginTop: 20},
  content: {flex: 2, alignItems: 'center'},
  option: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    height: '150%',
    padding: 20,
    gap: 40,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {flexDirection: 'row', alignItems: 'center', gap: 15},
  sectionName: {fontSize: 14, color: 'grey', fontWeight: '500'},
});

export default Profile;
