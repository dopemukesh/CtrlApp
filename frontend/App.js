import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
import OnboardingNav from './Screens/onboarding/OnboardingNav';
import AuthScreenNav from './Screens/authScreens/AuthScreenNav';
import AppScreenNav from './Screens/appScreens/AppScreenNav';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SplashScreen}
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
          name="OnboardingNav"
          component={OnboardingNav}
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
          name="AppAuth"
          component={AuthScreenNav}
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
          name="AppScreenNav"
          component={AppScreenNav}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
