import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import passwordImage from '../../assets/support/verify.jpg'

const VerfiyCodeScreen = ({ navigation }) => {

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
            <Text className="text-center text-2xl font-bold text-gray-800">Enter Verification Code </Text>
            <Text className="text-center font-md text-gray-400">
              We have sent the verification code to your email address. Please enter the code below to verify your account.
            </Text>
          </View>

          {/* enter your email here  */}
          <View className="flex flex-col space-y-5 mt-8" >

            {/* Text input for the email  */}
            <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
              <Icon name="inbox" size={25} className="" color="#c5c0c0" />
              <TextInput
                placeholder="Enter verification code"
                keyboardType="numeric"
                maxLength={6}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor={'#c5c0c0'}
                className="w-full px-2 py-3"
                onChangeText={(text) => {
                  if (text.length === 6) {
                    Keyboard.dismiss(); // Close the keyboard when the user has entered six digits
                  }
                }}
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
              <TouchableOpacity onPress={() => navigation.navigate('NewPassword')} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                <Text className="text-white font-light">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>


        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default VerfiyCodeScreen
