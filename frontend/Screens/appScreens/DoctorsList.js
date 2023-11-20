import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorList from './Components/DoctorList';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name:'Kayongo Johnson Brian ',
      title: 'First Item',
      distance:"2.5km",
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name:'Kayongo Johnson Brian ',
      title: 'Second Item',
      distance:"2.5km",
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name:'Kayongo Johnson Brian ',
      title: 'Third Item',
      distance:"2.5km",
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29dd72',
        name:'Kayongo Johnson Brian ',
        title: 'Third Item',
        distance:"2.5km",
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d7s2',
        name:'Kayongo Johnson Brian ',
        title: 'Third Item',
        distance:"2.5km",
      },
  ];



const DoctorsList = ({ navigation }) => {

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView className="flex flex-1 bg-[#eeeeee]">
                <View className="flex px-6 space-y-3 border-b-[1.5px] border-gray-100 shadow-sm">

                    <View className="mt-2 py-3 flex flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => navigateBack()}>
                            <Icon name="angle-left" size={25} className="" color="#000" />
                        </TouchableOpacity>
                        <Text className="font-bold text-xl">Popular Doctors</Text>
                        <Icon name="ellipsis-v" size={25} className="" color="#000" />
                    </View>

                    <FlatList
                        data={DATA}
                        className="space-y-3"
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <DoctorList name={item.name} title={item.title} distance={item.distance} />}
                        keyExtractor={item => item.id}
                    />

                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default DoctorsList
