import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const SplashScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text>Press me</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen
