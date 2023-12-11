import { View, Text, Dimensions, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../context/AuthContext';
import ServiceCard from './Components/ServiceCard';
import DoctorsCard from './Components/Doctors';
import axios from 'axios';

const BookingSuccess = ({ navigation, route }) => {
    const { doc } = route.params;

    return (
        <View className="flex px-5 space-y-3 items-center justify-center my-auto">
            <View className="items-center justify-center rounded-full p-4 bg-green-400 shadow-lg mb-4">
                <Icon
                    name="check"
                    size={80}
                    color="white"
                    className="mb-5"
                />
            </View>
                <Text className="text-base  font-bold ">Booking was Success</Text>
                <Text className="text-sm text-gray-500">Your appointment booking completed.</Text>
                <Text className="text-sm text-gray-500">Dr. {doc?.doctor?.user?.fullname} will Message you soon.</Text>

            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} className="px-5 items-center justify-center rounded-lg mt-4 w-full  bg-blue-900 p-4">
                <Text className="text-sm text-white">Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookingSuccess
