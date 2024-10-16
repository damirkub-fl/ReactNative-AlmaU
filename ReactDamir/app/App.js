import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen.js';
import HomeScreen from './HomeScreen.js';
import RestaurantDetailScreen from './RestaurantDetail.js';
import MapScreen from './MapScreen.js';
import LocationScreen from './LocationScreen.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="RestaurantDetail" 
      component={RestaurantDetailScreen}
      options={{ title: 'Информация о ресторане' }}
    />
    <Stack.Screen name="MapScreen" component={MapScreen} />
    <Stack.Screen name="LocationScreen" component={LocationScreen} />
  </Stack.Navigator>
  );
};

export default App;
