import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import VerfiyCodeScreen from './VerfiyCodeScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();


const AuthScreenNav = ({ navigation }) => {
  return (
    <NavigationContainer initialRouteName='Login' independent={true}>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
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
        name="ForgotPassword"
        component={ForgotPasswordScreen}
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
        name="VerifyCode"
        component={VerfiyCodeScreen}
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
        name="Register"
        component={RegisterScreen}
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

export default AuthScreenNav
