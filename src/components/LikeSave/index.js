/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardRecipe from '../../components/CardRecipe';
import {CheckBox} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const LikeSave = ({navigation}) => {
    const [checkedHeart, setCheckedHeart] = React.useState(false);
    const [checkedBookmark, setCheckedBookmark] = React.useState(false);
    return (
      <View style={styles.container}>
        <CheckBox
          checked={checkedBookmark}
          checkedIcon={<FeatherIcon name="bookmark" size={20} color="white" />}
          uncheckedIcon={<FeatherIcon name="bookmark" size={20} color="#EFC81A" />}
          checkedColor="grey"
          uncheckedColor="#EFC81A"
          onPress={() => setCheckedBookmark(!checkedBookmark)}
          containerStyle={{
            backgroundColor: checkedBookmark ? '#EFC81A' : 'transparent',
            borderColor: '#EFC81A',
            borderWidth: 1,
            borderRadius: 20
          }}
        />
        <CheckBox
          checked={checkedHeart}
          checkedIcon={<AntDesignIcon name="like2" size={20} color="white" />}
          uncheckedIcon={<AntDesignIcon name="like2" size={20} color="#EFC81A" />}
          onPress={() => setCheckedHeart(!checkedHeart)}
          containerStyle={{
            backgroundColor: checkedHeart ? '#EFC81A' : 'transparent',
            borderColor: '#EFC81A',
            borderWidth: 1,
            borderRadius: 20
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
  });
  export default LikeSave;