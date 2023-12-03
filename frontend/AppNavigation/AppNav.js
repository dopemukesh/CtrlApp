import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppScreens from './AppScreens';
import AuthScreens from './AuthScreens';
import { AuthProvider, useAuth } from "../context/AuthContext";


const Stack = createNativeStackNavigator();


const AppNav = () => {
    return (
        <AuthProvider>
            <Layout></Layout>
        </AuthProvider>
    );
};

export const Layout = () => {
    const { AuthState } = useAuth();


    return (
        <NavigationContainer independent={true}>
            {
                AuthState.authenticated ? (
                    <AppScreens />
                ) : (
                    <AuthScreens />
                )
            }
        </NavigationContainer>
    );
}

export default AppNav
