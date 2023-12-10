import { View, Text, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import moment from 'moment';


const SelectSlot = ({ selectedDate, selectedTime, doc,isChecked, setChecked }) => {
    const formattedDate = moment(selectedDate).format('LL');

    return (
        <View className="flex p-3 bg-white my-2 rounded-lg">
            <View className="flex flex-row items-center justify-between">
                <Text className="font-bold text-base">{formattedDate}</Text>

                <View className="flex flex-row space-x-1">
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : "rgb(209 213 219)"}
                        className="w-6 h-6 rounded-sm"
                        size={20}
                    />
                    <Text className="font-bold text-base text-gray-300">Correct</Text>
                </View>
            </View>

            <Text className="text-gray-300 text-base ">{moment(selectedDate).format('dddd')}</Text>

            <View className="flex flex-row">
                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Selected Time</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Shift : {selectedTime} </Text>
                </TouchableOpacity>

            </View>

            <View className="flex space-x-1 ">
                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Hospital 🏥 : {doc?.doctor?.hospital} </Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Address : {doc?.doctor?.address} {'\n'} {doc?.doctor?.city} {'\n'} {doc?.doctor?.state} {'\n'} {doc?.doctor?.country}</Text>
                </TouchableOpacity>
            </View>



        </View>
    )
}

export default SelectSlot
