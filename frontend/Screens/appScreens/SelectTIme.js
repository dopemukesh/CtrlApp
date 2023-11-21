import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorList from './Components/DoctorList';
import SelectSlot from './Components/SelectSlot';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Kayongo Johnson Brian ',
        title: 'First Item',
        distance: "2.5km",
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Kayongo Johnson Brian ',
        title: 'Second Item',
        distance: "2.5km",
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Kayongo Johnson Brian ',
        title: 'Third Item',
        distance: "2.5km",
    },
];


const SelectTIme = ({ navigation }) => {

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView className="flex flex-1 bg-gray-100">
                <View className="flex px-6 space-y-3">

                    <View className="mt-2 py-3 flex flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => navigateBack()}>
                            <Icon name="angle-left" size={25} className="" color="#000" />
                        </TouchableOpacity>
                        <Text className="font-bold text-xl">Select Time slot</Text>
                        <Text></Text>
                    </View>
                </View>
                <View className="px-5">

                    <FlatList
                        data={DATA}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <SelectSlot name={item.name} title={item.title} distance={item.distance} />}
                        keyExtractor={item => item.id}
                    />
                </View>
                <TouchableOpacity className="bg-blue-900 absolute bottom-10 px-5 py-3 w-[90%] mx-[5%] flex flex-row justify-center rounded-md">
                    <Text className="text-white text-sm font-bold ">Done</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SelectTIme
