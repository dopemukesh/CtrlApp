import { View, Text, Dimensions, SafeAreaView, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import ProfileComponent from './Components/ProfileComponent';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({})
  const { onLogout } = useAuth();



  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}user/`);
        setUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);


  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);


  return (
    // Make that even a user touches anywhere else on the screen the keyboard goes off
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {/* Safe area to prevent going off  */}
      <SafeAreaView className="flex flex-1 bg-white">
        <View className="flex px-5 space-y-0">

          <View className="mt-2 py-3 flex flex-row items-center justify-between">
            <TouchableOpacity className=" items-center justify-center border border-gray-100 rounded-full py-2 px-4">
              <Icon name="angle-left" size={25} className="" color="#000" />
            </TouchableOpacity>
            <Text className="font-bold text-xl">Profile </Text>
            <View></View>
          </View>
        </View>

        <View className="mt-0 py-3 flex items-center justify-center">
          <Image
            source={{ uri: `https://cataas.com/cat` }}
            style={{ width: 100, height: 100, marginRight: 12 }}
            className="rounded-full"
          />
          <View className="flex items-center mt-1 justify-center">
            <Text className="text-lg font-medium">{user?.fullname}</Text>
          </View>
        </View>

        <View className="flex px-4 space-y-2">
          <ProfileComponent name="Profile" icon="user-o" screen="Profile" />
          <ProfileComponent name="Payment Methods" icon="briefcase" screen="Profile" />
          <ProfileComponent name="Favorite" icon="gratipay" screen="Profile" />
          <ProfileComponent name="Settings" icon="cog" screen="Profile" />
          <ProfileComponent name="Help Center" icon="exclamation-circle" screen="Profile" />
          <ProfileComponent name="Privacy Policy" icon="lock" screen="Profile" />
          <ProfileComponent name="Logout" onLogout={onLogout} icon="sign-out" screen="Profile" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ProfileScreen
