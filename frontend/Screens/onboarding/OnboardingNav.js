import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Doctors from './Doctors';
import CareTaker from './CareTaker';
import Appointments from './Appointments';

const Stack = createNativeStackNavigator();



const OnboardingNav = () => {
  return (
    <NavigationContainer initialRouteName='Doctors' independent={true}>
    <Stack.Navigator>
      <Stack.Screen
        name="Doctors"
        component={Doctors}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          presentation:"fullScreenModal"
        }}
      />
      <Stack.Screen
        name="CareTaker"
        component={CareTaker}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          presentation:"fullScreenModal"
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={Appointments}
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

export default OnboardingNav
