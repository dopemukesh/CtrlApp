import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import passwordImage from '../../assets/support/forgotpassword.jpg'

const ForgotPasswordScreen = ({ navigation }) => {
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
          {/* button to go back  */}
          <View className="px-8 -mb-4">
            <TouchableOpacity onPress={() => navigateBack()}>
              <Icon name="angle-left" size={25} className="" color="#c5c0c0" />
            </TouchableOpacity>
          </View>

          {/* intro on the page  */}
          <View className="flex items-center justify-center px-12 space-y-4 mt-6">
            <Text className="text-center text-2xl font-bold text-gray-800">Forgot Password </Text>
            <Text className="text-center font-md text-gray-400">Please enter your email address we should use to reset your password</Text>
          </View>

          {/* enter your email here  */}
          <View className="flex flex-col space-y-5 mt-8" >

            {/* Text input for the email  */}
            <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
              <Icon name="inbox" size={25} className="" color="#c5c0c0" />
              <TextInput
                placeholder="Enter your Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={'#c5c0c0'}
                className="w-full px-2 py-3"
              />
            </View>

            {/* screen images */}
            <View className="flex justify-center items-center">
              <Image
                source={passwordImage}
                className="w-full"
                style={{
                  resizeMode: 'cover',
                  height: Dimensions.get('screen').height * 0.50,
                }}
              />
            </View>

            {/* button to send in the request */}
            <View className="flex justify-center items-center pt-2 px-8">
              <TouchableOpacity onPress={() => navigation.navigate('VerifyCode')} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                <Text className="text-white font-light">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>


        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ForgotPasswordScreen
