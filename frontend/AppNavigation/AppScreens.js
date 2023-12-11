import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../Screens/appScreens/HomeScreen';
import DiagnosisScreen from '../Screens/appScreens/DiagnosisScreen';
import ProfileScreen from '../Screens/appScreens/ProfileScreen';
import MessagesScreen from '../Screens/appScreens/MessagesScreen';
import Appointments from '../Screens/appScreens/AppointmentsScreen';
import DoctorsList from '../Screens/appScreens/DoctorsList';
import SingleDoctor from '../Screens/appScreens/SingleDoctor';
import SelectTIme from '../Screens/appScreens/SelectTIme';
import BookingSuccess from '../Screens/appScreens/BookingSuccess';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export const TabNav = () => {
  const route = useRoute();
  const focusedRoute = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

  const getTabBarIconColor = (routeName) => {
    return focusedRoute === routeName ? 'rgb(30,58,138)' : 'rgb(211, 211, 211)';
  };


  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={getTabBarIconColor('HomeScreen')} />
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
            <Icon name="book" size={20} color={getTabBarIconColor('Appointments')} />
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
            <Icon name="thermometer-4" size={20} color={getTabBarIconColor('DiagnosisScreen')} />
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
            <Icon name="envelope-open-o" size={20} color={getTabBarIconColor('MessagesScreen')} />
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
            <Icon name="user-o" size={20} color={getTabBarIconColor('ProfileScreen')} />
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
                <Stack.Screen
                    name="BookingSuccess"
                    component={BookingSuccess}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        presentation: "modal"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens
