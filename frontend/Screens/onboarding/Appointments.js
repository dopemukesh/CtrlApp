import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import appointments from '../../assets/support/appointment.jpg'



const DottedLine = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className="space-x-[2px]">
      <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: 'blue' }} />
      <View style={{ width: 15, height: 5, borderRadius: 50, backgroundColor: 'blue' }} />
      <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: 'blue' }} />
  </View>
);

const Appointments = ({ navigation }) => {
  return (
    <View className="flex flex-1 bg-[#dadada]">
            {/* first half of the page */}
            <View className="flex justify-center items-center">
                <Image
                    source={appointments}
                    className="w-full"
                    style={{
                        resizeMode: 'cover',
                        height: Dimensions.get('screen').height * 0.55,
                    }}
                />
            </View>
            {/* end of first half */}

            {/* second half of the page */}
            <View className="flex justify-center items-center px-8 rounded-t-lg rounded-tr rounded-tl">
                <View className="py-4 ">
                    <Text className="text-black font-extrabold py-2 text-2xl text-center">Schedule Appointments with expert doctors</Text>
                    <Text className="text-gray-500 px-3 font-light py-2 text-center ">Find experienced doctors and schedule appointments with expert ratings and reviews and book online</Text>
                </View>
            </View>
            {/* end of second half */}

            {/* dotted line */}
            <DottedLine className="py-2" />
            {/* end of dotted line */}

            {/* next button */}
            <View className="flex justify-center items-center pt-7 px-8">
                <TouchableOpacity onPress={() => navigation.navigate('CareTaker')} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                    <Text className="text-white font-light">Next</Text>
                </TouchableOpacity>
            </View>
            {/* end of next button */}

        </View>
  )
}

export default Appointments
