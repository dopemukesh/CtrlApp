import { View, Text, Dimensions, SafeAreaView, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../context/AuthContext';
import ServiceCard from './Components/ServiceCard';
import DoctorsCard from './Components/Doctors';
import axios from 'axios';
import AppointmentsCard from './Components/AppointmentsCard';


const Appointments = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);



  useEffect(() => {
    const getUserAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}doctors/check-appointments/`);
        if (response.status === 200) {
          setAppointments(response.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error(error);
        setAppointments([])
      }
    };

    getUserAppointments();
  }, []);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView className="flex flex-1 px-5">
      <StatusBar barStyle="dark-content" />
      <View className="flex px-6 space-y-3">
        <View className="flex flex-row mt-2 items-center justify-between">
          <TouchableOpacity onPress={() => navigateBack()}>
            <Icon name="angle-left" size={25} className="" color="#000" />
          </TouchableOpacity>
          <Text className="font-bold text-xl">My Appointments</Text>
          <View></View>
        </View>

        <View className="flex flex-row space-x-9 items-center bg-[#d3d3d3] rounded-lg justify-center">
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            style={{ backgroundColor: activeTab === 'upcoming' ? '#0D47A1' : 'transparent', borderRadius: 5, padding: 10, flex: 1, alignItems: 'center' }}
          >
            <Text style={{ color: activeTab === 'upcoming' ? '#fff' : '#666', textBase: 16 }}>Upcoming</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('past')}
            style={{ backgroundColor: activeTab === 'past' ? '#0D47A1' : 'transparent', borderRadius: 5, padding: 10, flex: 1, alignItems: 'center' }}
          >
            <Text style={{ color: activeTab === 'past' ? '#fff' : '#666', textBase: 16 }}>Past</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">

          <FlatList
              data={appointments}
              removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <AppointmentsCard item={item}  />}
              keyExtractor={item => item.id.toString()}
            />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Appointments
