// Navigation/Navigation.js

import { createStackNavigator, createAppContainer } from '@react-navigation/stack'
import Search from '../Components/Search'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function SearchStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} options={{title : 'Rechercher'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SearchStackNavigator