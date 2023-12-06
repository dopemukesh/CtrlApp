import { View, Text, Dimensions, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../context/AuthContext';
import ServiceCard from './Components/ServiceCard';
import DoctorsCard from './Components/Doctors';
import axios from 'axios';




const HomeScreen = ({ navigation }) => {

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
  }, [])



  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    // Make that even a user touches anywhere else on the screen the keyboard goes off
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {/* Safe area to prevent going off  */}
      <SafeAreaView className="flex flex-1 bg-white">

        {/* Intro welcome message  */}
        <View className="flex flex-row items-center justify-between px-4 py-3">
          <Text className="text-center text-sm font-medium text-gray-800">Hi, John 👋!</Text>
          <Image
            source={Logo}
            className="w-full rounded-lg"
            style={{
              resizeMode: 'contain',
              height: Dimensions.get('screen').height * 0.04,
              width: Dimensions.get('screen').height * 0.07,
            }}
          />
        </View>

        {/* intro text  */}
        <View className="flex flex-row items-center justify-between px-4 py-3">
          <Text className="text-start text-3xl font-bold font text-black">
            Keep taking {'\n'}care of your health
          </Text>
        </View>

        {/* search area */}
        <View className="flex flex-row items-center justify-center px-12 py-4 space-x-2">
          <View className="flex flex-row items-center px-4 py-4 bg-slate-50 rounded-md space-x-2 ">
            <Icon name="search" size={25} className="" color="#c5c0c0" />
            <TextInput
              placeholder="Search..."
              className="w-full"
            />
          </View>

          <TouchableOpacity className="bg-blue-900 p-2 rounded-md">
            <Icon name="sliders" size={25} className="" color="#ffffff" />
          </TouchableOpacity>
        </View>


        {/* categories lists */}
        <View className="px-4 py-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-start text-xl font-bold font text-black">
              Service Categories
            </Text>
            <TouchableOpacity className="">
              <Text className="text-blue-900 text-medium font-bold">See all</Text>
            </TouchableOpacity>
          </View>

          <View className="">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="space-x-3"
            >
              <ServiceCard title="Doctor" />
              <ServiceCard title="Nurse" />
              <ServiceCard title="Drug" />
              <ServiceCard title="Dental" />
              <ServiceCard title="Skin" />
              <ServiceCard title="Hospital" />
              <ServiceCard title="Care" />
            </ScrollView>
          </View>
        </View>


        {/* Doctors lists */}
        <View className="px-4 py-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-start text-xl font-bold font text-black">
              Popular Doctors
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PopularList')} className="">
              <Text className="text-blue-900 text-medium font-bold">See all</Text>
            </TouchableOpacity>
          </View>

          <View className="">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={doctors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DoctorsCard name={item.user.fullname} title={item.specialization} />
            )}
          />
          </View>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default HomeScreen
