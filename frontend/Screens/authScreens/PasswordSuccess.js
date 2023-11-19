import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import passwordImage from '../../assets/support/success.jpg'

const PasswordSuccess = ({ navigation }) => {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View className="flex flex-1 bg-[#ffffff]">
                <SafeAreaView>
                    {/* enter your email here  */}
                    <View className="flex flex-col space-y-5 mt-8" >

                        {/* screen images */}
                        <View className="flex justify-center items-center">
                            <Image
                                source={passwordImage}
                                className="w-full"
                                style={{
                                    resizeMode: 'cover',
                                    height: Dimensions.get('screen').height * 0.40,
                                }}
                            />
                        </View>

                        {/* intro on the page  */}
                        <View className="flex items-center justify-center px-12 space-y-4 mt-6">
                            <Text className="text-center text-2xl font-bold text-gray-800">Congratulations 😛 </Text>
                            <Text className="text-center font-md text-gray-400">
                                Your account is ready to use
                            </Text>
                        </View>

                        {/* button to send in the request */}
                        <View className="flex justify-center items-center pt-2 px-8">
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                                <Text className="text-white font-light">Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PasswordSuccess
