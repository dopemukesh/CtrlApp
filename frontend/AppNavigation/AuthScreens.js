import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PasswordSuccess from '../Screens/authScreens/PasswordSuccess';
import NewPassword from '../Screens/authScreens/NewPassword';
import LoginScreen from '../Screens/authScreens/LoginScreen';
import ForgotPasswordScreen from '../Screens/authScreens/ForgotPasswordScreen';
import VerfiyCodeScreen from '../Screens/authScreens/VerfiyCodeScreen';
import RegisterScreen from '../Screens/authScreens/RegisterScreen';

const Stack = createNativeStackNavigator();


const AuthScreens = () => {
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
            name="NewPassword"
            component={NewPassword}
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
            name="PasswordSuccess"
            component={PasswordSuccess}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              presentation:"modal"
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

export default AuthScreens
