/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({label, password, iconName, ...props}) => {
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>
      <View style={[style.inputContainer]}>
        <MaterialCommunityIcons name={iconName} size={20} />
        <TextInput style={{fontSize: 14}} {...props} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
});

export default Input;
