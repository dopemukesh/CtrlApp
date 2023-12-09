import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DocImage from '../../../assets/support/Doctor.jpg'
import {useNavigation} from "@react-navigation/native";


const DoctorList = ({ name, profile_image, title,id, distance }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('SingleDoctor', {id})} className="flex flex-row my-2 bg-white py-4 px-2 rounded-lg ">
            <View className="flex flex-row">
                <Image
                    source={DocImage}

                    className="rounded-md"
                    style={{
                        resizeMode: 'cover',
                        height: Dimensions.get('screen').height * 0.13,
                        width: Dimensions.get('screen').height * 0.13
                    }}
                />

                <View className="flex justify-around items-start pl-2">
                    <View className="flex flex-row space-x-1">
                        <Text className="text-black font-bold text-sm -mr-1 ">{name}</Text>

                        <View className="flex flex-row px-2 mr-1 justify-evenly items-center">
                            <Icon name="star" size={15} color="#FFDF00" />
                            <Text className="text-center text-sm font-medium font text-black">4.3</Text>
                        </View>
                    </View>

                    <Text className="py-2 font-base text-light">{title}</Text>

                    <View className="flex flex-row space-x-1">
                        <Icon name="location-arrow" size={15} color="#000" />
                        <Text className="text-sm font-medium font text-black">{distance}</Text>
                    </View>

                </View>
            </View>


        </TouchableOpacity>
    )
}

export default DoctorList
