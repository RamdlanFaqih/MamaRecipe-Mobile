/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';

const DetailRecipeVideo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Video
          source={{
            uri: 'https://res.cloudinary.com/dlveexbli/video/upload/v1697163087/y2mate.com_-_%EB%8C%80%EB%B0%95_%EB%A7%9B%EC%9E%88%EB%8A%94_%EC%97%90%EA%B7%B8_%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98_%EA%BC%AD_%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%84%B8%EC%9A%94_Delicious_egg_sandwich_480p_iwtzvq.mp4',
          }}
          style={{height: 300, width: '100%'}}
          resizeMode="cover"
          volume={1.0}
          muted={false}
          playInBackground={false}
          controls={true}
        />
      </View>
      <ScrollView style={styles.scrollSection}>
        <View style={styles.videoDetail}>
          <Text style={styles.videoTitle}>
            Beef Steak with Curry Sauce - [Step 4] Cut the condiment and then
            mix it
          </Text>
          <Text style={styles.videoDate}>3 Month Ago</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollSection: {
    padding: 28,
  },
  videoDetail: {
    gap: 8,
  },
  videoTitle: {
    fontSize: 18,
    color: '#000',
  },
  videoDate: {
    fontSize: 12,
    color: '#AAA',
  },
});

export default DetailRecipeVideo;
