import { View, Text, Dimensions, Image } from 'react-native'
import React,{useState, useEffect} from 'react'
import Logo from '../assets/logos/Ctrl.png'


const SplashScreen = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const logoSize = screenHeight * 0.3; // 30% of screen height

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('OnboardingNav')
        }, 5000);
    })


    return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: logoSize, height: logoSize }}>
                <Image source={Logo} style={{ flex: 1, width: undefined, height: undefined }} resizeMode="contain" />
            </View>
        </View>
    )
}

export default SplashScreen
