import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';

const AppointmentsCard = ({ navigation, item }) => {
  const isPastEvent = moment(item?.date?.date).isBefore(moment());

  return (
    <View className="flex bg-white my-3 space-y-6 p-3">
      <View className="space-y-1">
        <Text className="text-sm font-bold">Order ID: 00AP{item?.id}</Text>
        <Text className="text-gray-400 text-light">Appointment Date: {moment(item?.date?.date).format("MMM Do YYYY")}</Text>
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
          <Text className="text-sm font-bold">{item?.doctor?.user?.fullname}</Text>
          <Text className="text-gray-400 text-light">{item?.doctor?.specialization}</Text>
          <Text className="text-gray-400 text-light">{item?.doctor?.hospital}</Text>
          <Text className="text-gray-400 text-light">{item?.doctor?.address}</Text>
        </View>
      </View>

      <View className="mt-5 flex flex-row items-center justify-center space-x-14">
        {isPastEvent ? (
          <>
            <TouchableOpacity className="bg-[#d3d3d3] px-3 py-2 rounded">
              <Text className="text-sm font-base text-black">Write a Review</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-900 px-4 py-2 rounded">
              <Text className="text-sm font-bold text-white">View Details</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity className="bg-[#d3d3d3] px-10 py-2 rounded">
            <Text className="text-sm font-light text-black">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppointmentsCard;
