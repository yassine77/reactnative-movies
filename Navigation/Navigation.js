// Navigation/Navigation.js

import { createStackNavigator, createAppContainer } from '@react-navigation/stack'
import Search from '../Components/Search'

/* const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
}) */

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} title='Rechercher' />
    </Stack.Navigator>
  );
}

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppContainer

//export default createAppContainer(SearchStackNavigator)
//export default createAppContainer(Stack)