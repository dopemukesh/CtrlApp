import { View, Text, Dimensions, SafeAreaView, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DoctorChat from './Components/DoctorChat';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';


const MessagesScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}doctors/`);
        setDoctors(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  })
  const navigateBack = useCallback(() => {
    navigation.goBack();
}, [navigation]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  return (
    // Make that even a user touches anywhere else on the screen the keyboard goes off
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {/* Safe area to prevent going off  */}
      <SafeAreaView className="flex flex-1 bg-white">
        <View className="flex px-5 space-y-3">
          <View className="mt-2 py-3 flex flex-row items-center justify-between">
            <TouchableOpacity className="bg-blue-900 items-center justify-center rounded-full py-3 px-4">
              <Icon name="inbox" size={25} className="" color="#fff" />
            </TouchableOpacity>
            <Text className="font-bold text-xl">Chat </Text>
            <View></View>
          </View>
        </View>

        {/* doctors online */}
        <View className="px-4 py-3 mb-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-start text-xl font-bold font text-black">
              Chat with a Doctor
            </Text>
          </View>

          <View className="mb-4 my-3">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={doctors}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <DoctorChat
                  item={item}
                  navigation={navigation}
                />
              )}
            />
          </View>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default MessagesScreen
