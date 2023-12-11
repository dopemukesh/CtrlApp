import { View, Text } from 'react-native'
import React from 'react'

const AppointmentsCard = ({ navigation, item }) => {
  console.log(item?.date)
  return (
    <View className="flex bg-white my-2 p-3">
      <View className="space-y-1">
        <Text className="tex-base font-bold ">Order ID: 00AP{item?.id}</Text>
        <Text className="tex-base font-bold ">Appointment Date: {item?.date?.date}</Text>
      </View>
    </View>
  )
}

export default AppointmentsCard
