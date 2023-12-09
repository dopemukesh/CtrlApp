import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Logo from '../../assets/support/caretaker.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';


const SingleDoctor = ({ navigation, route }) => {
    const [docData, setDocData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);


    const { id } = route.params;

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`${API_URL}doctors/${id}/`);
                setDocData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctorData();
    }, [])

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const availableTimes = docData?.availability?.filter(timeSlot => timeSlot.is_available)
        .map(timeSlot => ({
            id: timeSlot.id,
            time: timeSlot.start_time
        }));

    const availableDates = docData?.doctor?.availability?.filter(dateSlot => dateSlot.is_available)
        .map(dateSlot => ({
            id: dateSlot.id,
            date: timeSlot.date
        }));

    const availableHourlySlots = docData?.availability?.filter(
        timeSlot => timeSlot.is_available && timeSlot.date === selectedDate
    );

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView
                className="flex flex-1 bg-gray-100 mb-100"
                showsVerticalScrollIndicator={false}
            >

                <ImageBackground
                    source={Logo}
                    className=""
                    style={{
                        resizeMode: 'cover',
                        height: Dimensions.get('screen').height * 0.35,
                        width: '100%',
                    }}
                >
                    <View className="flex px-6 mt-9 space-y-3">
                        <View className="mt-2 py-3 flex flex-row items-center justify-between">
                            <TouchableOpacity onPress={() => navigateBack()}>
                                <Icon name="angle-left" size={25} className="" color="#000" />
                            </TouchableOpacity>
                            <Icon name="ellipsis-v" size={25} className="" color="#000" />
                        </View>
                    </View>
                </ImageBackground>

                <View className="mx-6 pb-4 my-3 border-b border-gray-200 flex flex-row justify-between items-center">
                    <View className="space-y-2">
                        <Text className="font-bold text-base ">{docData?.doctor?.user?.fullname} </Text>
                        <Text>{docData?.doctor?.specialization}  </Text>
                    </View>
                    <View className="flex flex-row px-2 mr-1 justify-start items-start">
                        <Icon name="star" size={15} color="#FFDF00" />
                        <Text className="text-center text-sm font-medium font text-black">4.8</Text>
                    </View>
                </View>

                <View className="mx-6 pb-4 my-1 border-b border-gray-200">
                    <Text className="font-bold text-base ">
                        Descriptions
                    </Text>
                    <Text numberOfLines={4} className="text-sm text-clip ">
                        {docData?.doctor?.experience}
                    </Text>

                </View>

                <View className="mx-6 pb-4 my-1">
                    <Text className="font-bold text-base">
                        Select Date
                    </Text>
                    <FlatList
                        data={availableDates}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleDateSelection(item.date)}
                                style={{ backgroundColor: selectedDate === item.date ? '#2196F3' : '#fdf8f8' }}
                                className="py-4 mt-3 px-6 flex  mr-4 rounded-md"
                            >
                                <Text className={`text-${selectedDate === item.date ? 'white' : 'black'} text-lg font-bold`}>{item.date}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View className="mx-6 pb-4 my-1">
                    <Text className="font-bold text-base">
                        Select Time
                    </Text>
                    <FlatList
                        data={availableHourlySlots}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleTimeSelection(item.start_time)}
                                style={{ backgroundColor: selectedTime === item.start_time ? '#2196F3' : '#fdf8f8' }}
                                className="py-2 mt-1 px-6 flex  mr-4 rounded-md"
                            >
                                <Text className={`text-${selectedTime === item.start_time ? 'white' : 'black'} text-lg font-base`}>{item.start_time}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View className="flex flex-row  mx-6">
                    <TouchableOpacity className="bg-white border border-blue-900  py-2 mt-1 px-6 flex  mr-4 rounded-md">
                        <Text className="text-blue-900 text-base font-normal">Send Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!selectedDate || !selectedTime}
                        onPress={() => navigation.navigate('SelectTIme')}
                        className={`bg-${selectedDate && selectedTime ? 'blue-900' : 'gray-400'} py-2 mt-1 px-3 flex  mr-7 rounded-md`}
                    >
                        <Text className={`text-white bg-${selectedDate && selectedTime ? 'blue-900' : 'gray-400'} text-base font-bold`}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default SingleDoctor
