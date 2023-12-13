import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';



const ProfileComponent = ({ name, screen, icon, onLogout, onTapFunc }) => {
    const navigation = useNavigation();

    /**
     * Handles the form submission.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    const handleSubmit = () => {
        if (onLogout){
            onLogout();
        }
        if (onTapFunc){
            navigation.navigate(onTapFunc);
        }
    }

    return (

        <TouchableOpacity onPress={handleSubmit} className="flex flex-row items-center justify-between bg-white p-4 border border-gray-50 rounded-lg">
            <View className="flex flex-row items-center justify-start space-x-4">
                <Icon name={icon} size={24} color="blue" />
                <Text className="text-base font-light text-black">{name}</Text>
            </View>
            <Icon name="angle-right" size={24} color="blue" />
        </TouchableOpacity>
    )
}

export default ProfileComponent
