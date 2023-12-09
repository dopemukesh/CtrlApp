import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorList from './Components/DoctorList';


const DoctorsList = ({ navigation, route }) => {

    const { doctors } = route.params;

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
                        <Text className="font-bold text-xl">Popular Doctors</Text>
                        <Icon name="ellipsis-v" size={25} className="" color="#000" />
                    </View>
                </View>
                <View className="px-5">

                    <FlatList
                        data={doctors}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <DoctorList name={item.user.fullname} id={item.id} title={item.specialization} profile_image={item.profile_image} distance={item.city} />}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default DoctorsList
