import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Logo from '../../assets/support/caretaker.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import Moment from 'react-moment';
import moment from 'moment';

const SingleDoctor = ({ navigation, route }) => {
    const [docData, setDocData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState({
        id: null,
        date: null,
    });

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



    const generateHourlySlots = (startTime, endTime) => {
        const hourlySlots = [];
        let currentHour = moment(startTime, 'HH:mm:ss');

        while (currentHour.isBefore(moment(endTime, 'HH:mm:ss'))) {
            hourlySlots.push(currentHour.format('LT'));
            currentHour.add(1, 'hour');
        }

        return hourlySlots;
    };


    const availableDates = docData?.availability?.filter(dateSlot => dateSlot.is_available)
        .map(dateSlot => ({
            id: dateSlot.id,
            date: dateSlot.date
        }));

    const availableHourlySlots = selectedDate
        ? generateHourlySlots(docData?.availability[0]?.start_time, docData?.availability[0]?.end_time)
        : [];


    const handleDateSelection = (date, availabilityId) => {
        setSelectedDate(date);
        setSelectedTime(null);
        setSelectedAvailability({
            id: availabilityId,
            date: date,
        });
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
                    source={{
                        uri: `https://randomuser.me/api/portraits/men/${id}.jpg`
                    }}
                    style={{
                        resizeMode: 'cover',
                        height: Dimensions.get('screen').height * 0.35,
                        width: '100%',
                    }}
                >
                    <View className="flex px-6 mt-9 space-y-3">
                        <View className="mt-2 py-3 flex flex-row items-center justify-between">
                            <TouchableOpacity onPress={() => navigateBack()}>
                                <Icon name="angle-left" size={25} className="" color="#fff" />
                            </TouchableOpacity>
                            <Icon name="ellipsis-v" size={25} className="" color="#fff" />
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
                        renderItem={({ item }) => {
                            const formattedDate = moment(item.date).format("D");
                            const formattedDay = moment(item.date).format("ddd");
                            return (
                                <TouchableOpacity
                                    onPress={() => handleDateSelection(item.date, item.id)} // Pass the availability id here
                                    style={{ backgroundColor: selectedDate === item.date ? 'rgb(30,58,138)' : '#fdf8f8' }}
                                    className="py-4 mt-3 px-4 flex mr-4 rounded-md "
                                >
                                    <View className="space-y-1 flex justify-center items-center">
                                        <Text className={`text-${selectedDate === item.date ? 'white' : 'black'} text-sm font-bold`}>{formattedDate}</Text>
                                        <Text className={`text-${selectedDate === item.date ? 'white' : 'black'} text-sm font-bold`}>{formattedDay}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View className="mx-6 pb-4 my-1">
                    <Text className="font-bold text-base">
                        Select Time
                    </Text>
                    <FlatList
                        removeClippedSubviews={true}
                        data={availableHourlySlots}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleTimeSelection(item)}
                                style={{ backgroundColor: selectedTime === item ? 'rgb(30,58,138)' : '#fdf8f8' }}
                                className="py-2 mt-1 px-6 flex  mr-4 rounded-md"
                            >
                                <Text className={`text-${selectedTime === item ? 'white' : 'black'} text-lg font-base`}>{item}</Text>
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
                        onPress={() => navigation.navigate('SelectTIme', {
                            selectedDate: selectedDate,
                            selectedTime: selectedTime,
                            docData: docData,
                            selectedAvailabilityId: selectedAvailability.id,
                        })}
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
