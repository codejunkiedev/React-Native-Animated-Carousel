import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Animate from './src/screens/Animate';
import AnimateDetail from './src/screens/AnimateDetail';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

enableScreens();
const Stack = createSharedElementStackNavigator();
const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    };
  }
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Animate" headerMode='none'>
        <Stack.Screen name="Animate" component={Animate} />
        <Stack.Screen
          name="AnimateDetail"
          component={AnimateDetail}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};