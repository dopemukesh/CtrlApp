import { View, Text } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../Screens/appScreens/HomeScreen';
import DiagnosisScreen from '../Screens/appScreens/DiagnosisScreen';
import ProfileScreen from '../Screens/appScreens/ProfileScreen';
import MessagesScreen from '../Screens/appScreens/MessagesScreen';
import Appointments from '../Screens/appScreens/AppointmentsScreen';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorsList from '../Screens/appScreens/DoctorsList';
import SingleDoctor from '../Screens/appScreens/SingleDoctor';
import SelectTIme from '../Screens/appScreens/SelectTIme';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={`rgb(211, 211, 211)`} />
          ),
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: 'rgb(30 58 138)',
          tabBarInactiveTintColor: 'rgb(211, 211, 211)',
          tabBarStyle: {
            backgroundColor: 'white',
          }
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={`rgb(30 58 138)`} />
          ),
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: 'rgb(30 58 138)',
          tabBarInactiveTintColor: 'rgb(211, 211, 211)',
          tabBarStyle: {
            backgroundColor: 'white',
          }
        }}
      />
      <Tab.Screen
        name="DiagnosisScreen"
        component={DiagnosisScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={`rgb(30 58 138)`} />
          ),
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: 'rgb(30 58 138)',
          tabBarInactiveTintColor: 'rgb(211, 211, 211)',
          tabBarStyle: {
            backgroundColor: 'white',
          }
        }}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={`rgb(30 58 138)`} />
          ),
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: 'rgb(30 58 138)',
          tabBarInactiveTintColor: 'rgb(211, 211, 211)',
          tabBarStyle: {
            backgroundColor: 'white',
          }
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={`rgb(30 58 138)`} />
          ),
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: 'rgb(30 58 138)',
          tabBarInactiveTintColor: 'rgb(211, 211, 211)',
          tabBarStyle: {
            backgroundColor: 'white',
          }
        }}
      />



    </Tab.Navigator>
  )
}

const AppScreens = () => {
    return (
        <NavigationContainer initialRouteName='TabNav' independent={true}>
            <Stack.Navigator>
                <Stack.Screen
                    name="TabNav"
                    component={TabNav}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        presentation: "fullScreenModal"
                    }}
                />
                <Stack.Screen
                    name="PopularList"
                    component={DoctorsList}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        presentation: "fullScreenModal"
                    }}
                />
                <Stack.Screen
                    name="SingleDoctor"
                    component={SingleDoctor}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        presentation: "fullScreenModal"
                    }}
                />
                <Stack.Screen
                    name="SelectTIme"
                    component={SelectTIme}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        presentation: "fullScreenModal"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens
