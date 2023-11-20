import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DocImage from '../../../assets/support/Doctor.jpg'

const DoctorList = ({ name, icon, title, distance }) => {
    return (
        <TouchableOpacity className="flex flex-row pl-2 space-x-4 my-1 bg-white rounded-lg py-4 ">
            <View className="">
                <Image
                    source={DocImage}
                    className="rounded-md"
                    style={{
                        resizeMode: 'cover',
                        height: Dimensions.get('screen').height * 0.13,
                        width: Dimensions.get('screen').height * 0.13
                    }}
                />
            </View>

            {/* ratings and name */}
            <View className="flex flex-col mt-1 items-start justify-center">
                <View className="flex flex-row justify-start items-center space-x-2">

                    <Icon name="star" size={15} color="#FFDF00" />
                    <Text className="text-center text-sm font-medium font text-black">4.8</Text>

                </View>
                <Text numberOfLines={1} className="text-center text-sm font-bold font text-black">
                    {name}
                </Text>
                <Text className="text-center text-sm font-light font text-black">
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default DoctorList
