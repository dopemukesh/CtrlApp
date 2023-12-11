import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorList from './Components/DoctorList';
import SelectSlot from './Components/SelectSlot';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

const SelectTIme = ({ navigation, route }) => {
    const { selectedDate, selectedTime, docData, selectedAvailabilityId } = route.params;
    const [isChecked, setChecked] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleBookings = async () => {
        const response = await axios.post(`${API_URL}doctors/${docData?.doctor?.id}/book-appointment/${selectedAvailabilityId}/`, {
            user_time: selectedTime,
        })

        if (response.status === 200) {
            navigation.navigate('BookingSuccess', { doc: docData })
        } else {
            // Handle error
            console.log(response.data);
        }
    }


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView className="flex flex-1 bg-gray-100">
                <View className="flex px-6 space-y-3">

                    <View className="mt-2 py-3 flex flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => navigateBack()}>
                            <Icon name="angle-left" size={25} className="" color="#000" />
                        </TouchableOpacity>
                        <Text className="font-bold text-xl">Confirm Booking Details</Text>
                        <Text></Text>
                    </View>
                </View>

                <View className="px-5">
                    <DoctorList
                        name={docData?.doctor?.user?.fullname}
                        profile_image={docData?.doctor?.profile_image}
                        title={docData?.doctor?.specialization}
                        distance={docData?.doctor?.city}
                        bgColor="bg-blue-900"
                    />

                </View>

                <View className="px-5">
                    <SelectSlot
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        doc={docData}
                        isChecked={isChecked}
                        setChecked={setChecked}
                    />
                </View>

                <View className="flex p-3 bg-white my-2 space-x-1 space-y-2 mt-2 rounded-lg mx-5 px-3">
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex items-start justify-between">
                            <Text className="font-bold text-base">Appointment Cost</Text>
                            <Text className="font-light text-sm">Appointment fee for 1 Hour </Text>
                        </View>
                        <Text className="font-bold text-base">RWF. 20,000</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between">
                        <View className="flex items-start justify-between">
                            <Text className="font-bold text-base">Admin Fee</Text>
                            <Text className="font-light text-sm">Processing Fee</Text>
                        </View>
                        <Text className="font-bold text-base">RWF. 1500</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex items-start justify-between">
                            <Text className="font-bold text-base">Total Fee</Text>
                            <Text className="font-light text-sm">Total Booking fee</Text>
                        </View>
                        <Text className="font-bold text-base">RWF. 20,1500</Text>
                    </View>
                </View>


                <TouchableOpacity
                    className={`absolute bottom-10 px-5 py-3 w-[90%] mx-[5%] flex flex-row justify-center rounded-md ${!isChecked ? 'bg-gray-400' : 'bg-blue-900'
                        }`}
                    disabled={!isChecked}
                    onPress={handleBookings}
                >
                    <Text className={`text-${!isChecked ? 'black' : 'white'} text-sm font-bold`}>Done</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SelectTIme
