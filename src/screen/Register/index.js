/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../components/Input';
import axios from 'axios';
import { ScrollView } from 'react-native';

const Register = ({navigation}) => {
  const [data, setData] = React.useState({
    name: '',
    email_address: '',
    phone_number: '',
    password: '',
  });

  const handleChange = (field, text) => {
    setData({
      ...data,
      [field]: text,
    });
  };

  const handleRegister = () => {
    if (data.password !== data.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    axios
      .post(`${process.env.API_URL}/register`, data)
      .then(response => {
        console.log(response);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      <View style={style.register}>
        <Text style={style.title}>Let's get started !</Text>
        <Text style={style.description}>
          Create new account to acces all features
        </Text>
      </View>
      <View style={style.form}>
      <Input
        placeholder="Name"
        iconName="account-outline"
        value={data.name}
        onChangeText={text => handleChange('name', text)}
      />
      <Input
        placeholder="E-Mail"
        iconName="email-outline"
        value={data.email_address}
        onChangeText={text => handleChange('email_address', text)}
      />
      <Input
        placeholder="Phone Number"
        iconName="phone-outline"
        value={data.phone_number}
        onChangeText={text => handleChange('phone_number', text)}
      />
      <Input
        placeholder="Create New Password"
        iconName="lock-outline"
        value={data.password}
        onChangeText={text => handleChange('password', text)}
      />
      <Input
        placeholder="New Password"
        iconName="lock-outline"
        value={data.confirmPassword}
        onChangeText={text => handleChange('confirmPassword', text)}
      />
      </View>
      <TouchableOpacity onPress={handleRegister} style={style.button}>
        <Text style={style.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={style.login}>
        <Text style={{fontSize: 16}}>Already have account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')} style={style.signup}>
          <Text style={{color: '#EFC81A', fontSize: 16}}>Log in here</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundColor: '#F5F5F5',

  container: {flex: 1, padding: 25},
  register: {alignItems: 'center'},
  title: {color: '#EFC81A', fontSize: 24, fontWeight: 'bold'},
  description: {color: '#C4C4C4', fontSize: 12},
  button: {
    backgroundColor: '#EFC81A',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  login : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signup: {
    marginLeft: 2,
  },
});

export default Register;
