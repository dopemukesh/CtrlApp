import { View, Text, Dimensions, SafeAreaView, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const DiagnosisDetails = ({ navigation, route }) => {
    const { item } = route.params;

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View className="flex flex-1 px-6">
            <View className="flex  space-y-3">
                <View className="mt-2 py-3 flex flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => navigateBack()}>
                        <Icon name="angle-left" size={25} className="" color="#000" />
                    </TouchableOpacity>
                    <Text className="font-bold text-xl">Diagnosis Details</Text>
                    <Icon name="ellipsis-v" size={25} className="" color="#000" />
                </View>
            </View>
            <View className="flex flex-row mt-4 space-x-5">
                <View className="">
                    <Image
                        source={{
                            uri: `https://randomuser.me/api/portraits/men/${item?.doctor?.id}.jpg`
                        }}
                        className="w-20 h-20 rounded-full"
                    />
                </View>
                <View>
                    <Text className="text-sm font-bold">Dr. {item?.doctor?.user?.fullname}</Text>
                    <Text className="text-gray-400 text-light">{item?.doctor?.specialization}</Text>
                    <Text className="text-gray-400 text-light">{item?.doctor?.hospital}</Text>
                    <Text className="text-gray-400 text-light">{item?.doctor?.address}</Text>
                </View>
            </View>

            <View className="mt-5 space-y-5">
                <View>
                    <Text className="text-base font-base">Diagnosis Date Details </Text>
                    <View className="flex ">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm text-gray-400 font-base">Diagnosis ID </Text>
                            <Text className="text-sm ext-gray-400 font-base"> 00DI{item?.id}</Text>
                        </View>
                    </View>
                    <View className="flex ">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm text-gray-400 font-base">Diagnosis Date </Text>
                            <Text className="text-sm ext-gray-400 font-base"> {moment(item?.date?.date).format("MMM Do YYYY")}</Text>
                        </View>
                    </View>
                </View>

                {/* patient data */}
                <View>
                    <Text className="text-base font-base">Patient Details </Text>
                    <View className="flex ">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm text-gray-400 font-base">Patient Name </Text>
                            <Text className="text-sm ext-gray-400 font-base"> {item?.patient?.fullname}</Text>
                        </View>
                    </View>
                    <View className="flex ">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm text-gray-400 font-base">Patient Email </Text>
                            <Text className="text-sm ext-gray-400 font-base"> {item?.patient?.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Diagnosis */}
                <View className="space-y-2">
                    <Text className="text-base font-base">Diagnosis Details </Text>
                    <View className="flex space-y-1">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm  font-base">Doctor Diagnosis </Text>
                            <Text className="text-sm text-blue-700 font-base w-fit"> {item?.diagnosis}</Text>
                        </View>
                    </View>
                    <View className="flex space-y-1">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm  font-base">Patient symptoms </Text>
                        </View>
                        <Text className="text-sm items-end text-gray-400 font-base w-fit"> {item?.symptoms}</Text>
                    </View>

                    <View className="flex space-y-1">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm  font-base">Doctor Remarks </Text>
                        </View>
                        <Text className="text-sm text-gray-400 font-base w-fit"> {item?.remarks}</Text>
                    </View>



                    <View className="flex space-y-1">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm  font-base">Doctor Additional info </Text>
                        </View>
                        <Text className="text-sm text-gray-700 font-base w-fit"> {item?.additional_info}</Text>
                    </View>
                </View>

                <TouchableOpacity className="bg-blue-900 items-center justify-center py-3 rounded-lg">
                    <Text className="text-white font-bold text-base">View Prescription</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default DiagnosisDetails
