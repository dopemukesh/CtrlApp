import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ServiceCard = ({icon, title}) => {
  return (
    <TouchableOpacity className="flex bg-slate-100 rounded-lg mt-3 mr-3 p-6 space-y-1 ">
        <View className="flex items-center justify-center">
            <Icon name="user" size={30} color="#c5c0c0" />
        </View>
        <View className="flex flex-col items-center justify-center">
            <Text className="text-center text-sm font-light font text-black">
                {title}
            </Text>
          </View>
    </TouchableOpacity>
  )
}

export default ServiceCard
