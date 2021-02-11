// Navigation/Navigation.js

import { createStackNavigator, createAppContainer } from '@react-navigation/stack'
import Search from '../Components/Search'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function SearchStackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Search" 
                      component={Search} 
                      options={{title : 'Rechercher'}} 
                      />
        <Stack.Screen name="FilmDetail" 
                      component={FilmDetail} 
                      options={{title : 'Détails du film'}} 
                      />
      </Stack.Navigator>
  );
}

function MoviesTabNavigator(){
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={SearchStackNavigator} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default MoviesTabNavigator