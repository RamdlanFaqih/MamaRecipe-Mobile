/* eslint-disable prettier/prettier */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
import {
  Login,
  Register,
  HomeScreen,
  PostRecipe,
  Profile,
  EditProfile,
  MyRecipe,
  SavedRecipe,
  LikedRecipe,
  DetailPopularMenu,
  DetailRecipe,
  DetailRecipeVideo,
  Search,
} from './src/screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'My home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: '#EEC302',
          tabBarInactiveBackgroundColor: 'white',
        }}
      />
      <Tab.Screen
        name="PostRecipe"
        component={PostRecipe}
        options={{
          headerShown: false,
          title: 'Recipe',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="plus-box-outline"
              color={color}
              size={size}
            />
          ),
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: '#EEC302',
          tabBarInactiveBackgroundColor: 'white',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: '#EEC302',
          tabBarInactiveBackgroundColor: 'white',
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  React.useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      SplashScreen.hide();
    };
    SplashScreen.show();

    hideSplashScreen();
  }, []);
  console.log('Hello');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostRecipe"
          component={PostRecipe}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyRecipe"
          component={MyRecipe}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavedRecipe"
          component={SavedRecipe}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LikedRecipe"
          component={LikedRecipe}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailPopularMenu"
          component={DetailPopularMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailRecipe"
          component={DetailRecipe}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailRecipeVideo"
          component={DetailRecipeVideo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
