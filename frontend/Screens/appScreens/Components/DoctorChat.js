import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';


const DoctorChat = ({ item, navigation }) => {
    return (
        <TouchableOpacity className="flex flex-row bg-white p-4 border border-gray-100 my-3 rounded-lg">
            <View className="flex flex-row items-center justify-between space-x-4">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: `https://randomuser.me/api/portraits/men/${item?.id}.jpg` }}
                        style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
                    />

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.user?.fullname}</Text>
                        <Text style={{ fontSize: 12, color: '#757575' }}>Last message: {moment(item?.lastMessageTime).fromNow()}</Text>
                    </View>
                </View>
                {item?.isActive ? (
                    <View style={{ backgroundColor: 'green', width: 10, height: 10, borderRadius: 5, marginRight: 8, alignContent:"flex-end" }} />
                ) : (
                    <View style={{ backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, marginRight: 8, alignContent:"flex-end" }} />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default DoctorChat
