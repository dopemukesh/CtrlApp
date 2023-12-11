import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const DiagnosisCard = ({ item }) => {
    const isPastEvent = moment(item?.date?.date).isBefore(moment());
    const navigation = useNavigation();

    return (
        <View className="flex bg-white my-3 space-y-6 p-3">
            <View className="space-y-1">
                <Text className="text-sm font-bold">Diagnosis ID: 00DI{item?.id}</Text>
                <Text className="text-gray-400 text-light">Diagnosis Date: {moment(item?.date?.date).format("MMM Do YYYY")}</Text>
            </View>
            <View className="flex flex-row mt-2 items-center space-x-3">
                <View>
                    <Image
                        source={{
                            uri: `https://randomuser.me/api/portraits/men/${item?.doctor?.id}.jpg`
                        }}
                        className="w-20 h-20 rounded-lg"
                    />
                </View>
                <View className="items-start">
                    <Text className="text-sm font-bold">Dr. {item?.doctor?.user?.fullname}</Text>
                    <Text className="text-gray-400 text-light">{item?.doctor?.specialization}</Text>
                    <Text className="text-gray-400 text-light">{item?.doctor?.hospital}</Text>
                    <Text className="text-gray-400 text-light">{item?.doctor?.address}</Text>
                </View>
            </View>

            <View className="mt-5 flex flex-row items-center justify-center space-x-14">
                <TouchableOpacity className="bg-[#d3d3d3] px-3 py-2 rounded">
                    <Text className="text-sm font-base text-black">Message Doctor </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('DiagnosisDetails', { item })} className="bg-blue-900 px-4 py-2 rounded">
                    <Text className="text-sm font-bold text-white">View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DiagnosisCard
