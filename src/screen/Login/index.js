/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../components/Input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [data, setData] = React.useState({
    email_address: '',
    password: '',
  });

  const handleLogin = () => {
    axios
      .post(`${process.env.API_URL}/login`, data)
      .then(response => {
        console.log('Response data: ', response.data);
        if (response.data && response.data.userId) {
          console.log('User ID: ', response.data.userId);
          AsyncStorage.setItem('users_id', response.data.userId.toString())
            .then(() => {
              console.log('users_id has been saved successfully!');
            })
            .catch(error => {
              console.log('Failed to save users_id: ', error);
            });
          navigation.navigate('Home');
        } else {
          console.log('Login failed: ', response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.login}>
        <Image
          source={require('../../assets/icon/user.png')}
          style={style.logo}
        />
        <Text style={style.title}>Welcome !</Text>
        <Text style={style.description}>Log in to your exiting account</Text>
      </View>
      <View style={style.form}>
        <Input
          placeholder="examplexxx@gmail.com"
          value={data.email_address}
          onChangeText={text => setData({...data, email_address: text})}
        />
        <Input
          placeholder="Password"
          value={data.password}
          onChangeText={text => setData({...data, password: text})}
          secureTextEntry={true}
        />
      </View>
      <Text style={style.forgot}>Forgot Password ?</Text>
      <TouchableOpacity onPress={handleLogin} style={style.button}>
        <Text style={style.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={style.register}>
        <Text style={{fontSize: 16}}>Don't have an account?</Text>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={style.signup}>
          <Text style={{color: '#EFC81A', fontSize: 16}}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundColor: 'white',

  container: {flex: 1, padding: 25, marginTop: 16},
  login: {alignItems: 'center', marginTop: 20},
  title: {color: '#EFC81A', fontSize: 18, fontWeight: 'bold'},
  description: {color: '#C4C4C4', fontSize: 12},
  logo: {
    width: 123,
    height: 123,
    backgroundColor: '#C4C4C4',
    padding: 60,
    marginBottom: 10,
    borderRadius: 60,
  },
  forgot: {
    marginTop: 12,
    textAlign: 'right',
  },
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
  register: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signup: {
    marginLeft: 2,
  },
});

export default Login;
