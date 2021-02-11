// Navigation/Navigation.js

import { createStackNavigator, createAppContainer } from '@react-navigation/stack'
import Search from '../Components/Search'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search"
        component={Search}
        options={{ title: 'Rechercher' }}
      />
      <Stack.Screen name="FilmDetail"
        component={FilmDetail}
        options={{ title: 'Détails du film' }}
      />
    </Stack.Navigator>
  );
}

function MoviesTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Search') {
              return <Image
                source={require('../Images/ic_search.png')}
                style={styles.icon} />
            } else if (route.name === 'Favorites') {
              return <Image
                source={require('../Images/ic_favorite.png')}
                style={styles.icon} />
            }
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
          inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
          showLabel: false, // On masque les titres
          showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }}
      >
        <Tab.Screen name="Search" component={SearchStackNavigator} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default MoviesTabNavigator