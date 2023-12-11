import { View, Text, Dimensions, SafeAreaView, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../context/AuthContext';
import axios from 'axios';
import AppointmentsCard from './Components/AppointmentsCard';
import moment from 'moment';

const DiagnosisScreen = ({ navigation }) => {

  useEffect(() => {
    const getUserAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}doctors/diagnosis/`);
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
  return (
    <View>
      <Text>DiagnosisScreen</Text>
    </View>
  )
}

export default DiagnosisScreen
