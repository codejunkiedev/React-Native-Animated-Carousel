import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Animate from './src/screens/Animate'
import AnimateDetail from './src/screens/AnimateDetail'
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Animate">
        <Stack.Screen name="Animate" component={Animate} options={{ headerShown: false }}/>
        <Stack.Screen name="AnimateDetail" component={AnimateDetail} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};