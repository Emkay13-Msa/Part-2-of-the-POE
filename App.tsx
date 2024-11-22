import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import ChefPage from './Chefpage';
import FilterPage from './Filterpage';
import { MenuProvider } from './MenuContext';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Homepage">
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="ChefPage" component={ChefPage} />
          <Stack.Screen name="FilterPage" component={FilterPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;




