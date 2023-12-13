import { View, Text, Dimensions, SafeAreaView, FlatList, Modal, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import ProfileComponent from './Components/ProfileComponent';
import { useAuth } from '../../context/AuthContext';

const Editprofile = () => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState({});
    const [editedProfile, setEditedProfile] = useState({});
    const [height, setHeight] = useState(40); // Initial height
    const [isGenderModalVisible, setGenderModalVisible] = useState(false);
    const [isBloodTypeModalVisible, setBloodTypeModalVisible] = useState(false);


    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        // Adjust the height dynamically based on the contentHeight
        setHeight(contentHeight < 40 ? 40 : contentHeight);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}profile/`);
                setProfile(response.data);
                setEditedProfile(response.data); // Initialize editedProfile with the current profile data
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);


    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(`${API_URL}profile/`, editedProfile);
            if (response.status === 200) {
                console.log('Profile updated successfully');
            }else{
                console.log('Profile update failed');
            }
            console.log('Updating profile', editedProfile)
        } catch (error) {
            console.error(error);
            // Optionally: Handle error and provide feedback to the user
        }
    };


    const genders = ['Male', 'Female', 'Other'];
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];


    const handleBloodTypeChange = (selectedBloodType) => {
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            blood_type: selectedBloodType,
        }));
        setBloodTypeModalVisible(false);
    };


    const handleGenderChange = (selectedGender) => {
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            gender: selectedGender,
        }));
        setGenderModalVisible(false);
    };


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} >
            {/* Safe area to prevent going off  */}
            <ScrollView
                className="flex flex-1 bg-white relative"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"

            >

                <View className="flex px-5 space-y-0">

                    <View className="mt-2 py-3 flex flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => navigateBack()} className=" items-center justify-center border border-gray-100 rounded-full py-2 px-4">
                            <Icon name="angle-left" size={25} className="" color="#000" />
                        </TouchableOpacity>
                        <Text className="font-bold text-xl">Your Profile </Text>
                        <View></View>
                    </View>
                </View>

                <View className="mt-0 py-3 flex items-center justify-center">
                    <Image
                        source={{ uri: `https://cataas.com/cat` }}
                        style={{ width: 100, height: 100, marginRight: 12 }}
                        className="rounded-full"
                    />
                    <View className="flex items-center mt-1 justify-center">
                        <Text className="text-lg font-medium">{profile?.user?.fullname}</Text>
                    </View>
                </View>

                <View className="mt-5 px-5 space-y-3">
                    <View>
                        <Text className="text-base font-medium">Name</Text>
                        <TextInput
                            placeholder="Enter Name"
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.fullname}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    fullname: text,
                                }))
                            }
                        />
                    </View>
                    <View>
                        <Text className="text-base font-medium">Allergies</Text>
                        <TextInput
                            placeholder="Enter all your allergies"
                            multiline
                            numberOfLines={5}
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            placeholderTextColor="gray"
                            onContentSizeChange={(e) =>
                                handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
                            }
                            style={{ height: Math.min(120, height), borderColor: 'gray', borderWidth: 1, padding: 10 }}
                            value={editedProfile?.allergies}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    allergies: text
                                }))
                            }
                        />
                    </View>

                    <View>
                        <Text className="text-base font-medium">Blood Type</Text>
                        <TouchableOpacity
                            onPress={() => setBloodTypeModalVisible(true)}
                            className="w-full h-12 px-4 justify-center  border-b-2 border-gray-200 rounded-lg"
                        >
                            <Text>{editedProfile.blood_type || 'Select Blood Type'}</Text>
                        </TouchableOpacity>

                        {/* Blood Type Modal */}
                        <Modal visible={isBloodTypeModalVisible} animationType="slide" transparent onRequestClose={() => setGenderModalVisible(false)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Select Blood Type</Text>
                                    <FlatList
                                        data={bloodTypes}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => handleBloodTypeChange(item)}
                                                style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item}
                                    />
                                    <TouchableOpacity onPress={() => setBloodTypeModalVisible(false)} style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'blue' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View>
                        <Text className="text-base font-medium">Gender</Text>
                        <TouchableOpacity
                            onPress={() => setGenderModalVisible(true)}
                            className="w-full h-12 px-4 justify-center  border-b-2 border-gray-200 rounded-lg"
                        >
                            <Text>{editedProfile.gender || 'Select Gender'}</Text>
                        </TouchableOpacity>

                        {/* Gender Modal */}
                        <Modal visible={isGenderModalVisible} animationType="slide" transparent onRequestClose={() => setGenderModalVisible(false)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Select Gender</Text>
                                    <FlatList
                                        data={genders}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => handleGenderChange(item)}
                                                style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item}
                                    />
                                    <TouchableOpacity onPress={() => setGenderModalVisible(false)} style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'blue' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View>
                        <Text className="text-base font-medium">Contact Number </Text>
                        <TextInput
                            placeholder="Enter Name"
                            textContentType='telephoneNumber'
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.contact_number}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    contact_number: text,
                                }))
                            }
                        />
                    </View>

                    <View>
                        <Text className="text-base font-medium">Street Address </Text>
                        <TextInput
                            placeholder="Enter Name"
                            textContentType='streetAddressLine1'
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.street_address}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    street_address: text,
                                }))
                            }
                        />
                    </View>

                    <View>
                        <Text className="text-base font-medium">Street City </Text>
                        <TextInput
                            placeholder="Enter Name"
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.city}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    city: text,
                                }))
                            }
                        />
                    </View>

                    <View>
                        <Text className="text-base font-medium">Street state </Text>
                        <TextInput
                            placeholder="Enter Name"
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.state}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    state: text,
                                }))
                            }
                        />
                    </View>


                    <View>
                        <Text className="text-base font-medium">County </Text>
                        <TextInput
                            placeholder="Enter Name"
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.country}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    country: text,
                                }))
                            }
                        />
                    </View>

                    <View>
                        <Text className="text-base font-medium">Zip Code </Text>
                        <TextInput
                            placeholder="Enter Name"
                            textContentType='postalCode'
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg"
                            value={editedProfile?.zip_code}
                            onChangeText={(text) =>
                                setEditedProfile((prevProfile) => ({
                                    ...prevProfile,
                                    zip_code: text,
                                }))
                            }
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={handleUpdateProfile} className="bg-blue-900 mx-5 my-3 p-3 rounded-lg">
                    <Text className="text-white text-center">Update Profile</Text>
                </TouchableOpacity>

            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default Editprofile
