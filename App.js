import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import SearchStackNavigator from './Navigation/Navigation';



function App() {
  return (
    <Provider store={Store}>
      <SearchStackNavigator />
    </Provider>
  )
}


export default App;
