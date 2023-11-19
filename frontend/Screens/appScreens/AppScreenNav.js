import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';


const Stack = createNativeStackNavigator();


const AppScreenNav = () => {
  return (
    <NavigationContainer initialRouteName='Login' independent={true}>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          presentation:"fullScreenModal"
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppScreenNav
