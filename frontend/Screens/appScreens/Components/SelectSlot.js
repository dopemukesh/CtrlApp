import { View, Text, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

const SelectSlot = () => {
    const [isChecked, setChecked] = useState(false);

    return (
        <View className="flex p-3 bg-white my-2 rounded-lg">
            <View className="flex flex-row items-center justify-between">
                <Text className="font-bold text-base">March 14, 2022</Text>

                <View className="flex flex-row space-x-1">
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : "rgb(209 213 219)"}
                        className="w-6 h-6 rounded-sm"
                        size={20}
                    />
                    <Text className="font-bold text-base text-gray-300">Needed</Text>
                </View>
            </View>

            <Text className="text-gray-300 text-base ">Friday</Text>

            <View className="flex flex-row">
                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Shift A: 9AM - 5PM</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Shift A: 9AM - 5PM</Text>
                </TouchableOpacity>

            </View>
            <View className="flex flex-row">
                <TouchableOpacity className="bg-[#fdf8f8] py-2 mt-1 px-2 flex  mr-4 rounded-md">
                    <Text className="text-black text-sm font-base">Shift A: 9AM - 5PM</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SelectSlot
