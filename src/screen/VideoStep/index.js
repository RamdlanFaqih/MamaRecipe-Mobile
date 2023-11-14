/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';

const VideoStep = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailRecipeVideo')}
          style={styles.iconPlay}>
          <FeatherIcons name="play" size={26} color="white" />
        </TouchableOpacity>
        <View style={styles.videoDetail}>
          <Text style={styles.step}>Step 1</Text>
          <Text style={styles.stepDetail}>Boil eggs for 3 minutes</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  videoCard: {
    padding: 10,
    backgroundColor: '#FAF7ED',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlay: {
    padding: 10,
    borderRadius: 20,
    width: 56,
    height: 56,
    backgroundColor: '#EEC302',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  videoDetail: {
    marginLeft: 30,
    gap: 5,
  },
  step: {
    fontSize: 16,
    color: '#666',
  },
  stepDetail: {
    fontSize: 12,
    color: '#B6B6B6',
  },
});

export default VideoStep;
