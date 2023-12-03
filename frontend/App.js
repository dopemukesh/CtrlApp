import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
import OnboardingNav from './Screens/onboarding/OnboardingNav';

import AppNav from './AppNavigation/AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [onboarding, setOnboarding] = useState(null);

  // handle the onboarding of the new person coming to the platform
  useEffect(() => {
    AsyncStorage.getItem("onboarding").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("onboarding", "true");
        setOnboarding(true);
      } else {
        setOnboarding(false);
      }
    });
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {
          onboarding && (
            <>
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
            </>
          )
        }
        <Stack.Screen
          name="AppNav"
          component={AppNav}
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

