import { View, Text, Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Logo from '../../assets/support/caretaker.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';

const SingleDoctor = ({ navigation }) => {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const dates = [
        { "id": 1, "date": "2023-11-20" },
        { "id": 2, "date": "2023-11-21" },
        { "id": 3, "date": "2023-11-22" },
        { "id": 4, "date": "2023-11-23" },
        { "id": 5, "date": "2023-11-24" },
        { "id": 6, "date": "2023-11-25" },
        { "id": 7, "date": "2023-11-26" },
        { "id": 8, "date": "2023-11-27" },
        { "id": 9, "date": "2023-11-28" },
        { "id": 10, "date": "2023-11-29" },
        { "id": 11, "date": "2023-11-30" }
    ]

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
                        <Text className="font-bold text-base ">Kayongo Johnson Brian</Text>
                        <Text>Cardiology</Text>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do eiusmod tempor incididunt ut labore et dolore.
                    </Text>

                </View>

                <View className="mx-6 pb-2 my-1">
                    <Text className="font-bold text-base ">
                        Select Date
                    </Text>

                    <FlatList
                        data={dates}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="bg-[#fdf8f8] py-4 mt-3 px-6 flex  mr-4 rounded-md">
                                <Text className="text-black text-lg font-bold">20</Text>
                                <Text className="text-black text-medium font-normal">Sun</Text>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />

                </View>

                <View className="mx-6 pb-4 my-1">
                    <Text className="font-bold text-base ">
                        Select Date
                    </Text>

                    <FlatList
                        data={dates}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-6 flex  mr-4 rounded-md">
                                <Text className="text-black text-lg font-base">08:00 AM</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('SelectTIme')} className="bg-blue-900 py-2 mt-1 px-3 flex  mr-7 rounded-md">
                        <Text className="text-white bg-blue-900 text-base font-bold">Book Appointment</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default SingleDoctor
