import { View, Text, Dimensions, SafeAreaView, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../context/AuthContext';
import axios from 'axios';
import DiagnosisCard from './Components/DiagnosisCard';

const DiagnosisScreen = ({ navigation }) => {
  const [diagnosis, setDiagnosis] = useState([]);


  useEffect(() => {
    const getUserDiagnosis = async () => {
      try {
        const response = await axios.get(`${API_URL}doctors/diagnosis/`);
        if (response.status === 200) {
          setDiagnosis(response.data);
        } else {
          setDiagnosis([]);
        }
      } catch (error) {
        console.error(error);
        setDiagnosis([])
      }
    };

    getUserDiagnosis();
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
          <Text className="font-bold text-xl">My Diagnosis</Text>
          <View></View>
        </View>

        <View className="mb-4">

          <FlatList
            data={diagnosis}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <DiagnosisCard item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DiagnosisScreen
