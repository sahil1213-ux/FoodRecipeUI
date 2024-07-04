import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../Screens/Auth/WelcomeScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import RecipeDetails from '../Screens/Home/RecipeDetails';
import FavouriteScreen from '../Screens/Home/FavouriteScreen';
import SearchScreen from '../Screens/Home/SearchScreen';

export default function AuthNav() {
  const Stack = createNativeStackNavigator();
  const setOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={setOptions} initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
