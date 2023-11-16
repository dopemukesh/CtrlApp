import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    DatePickerIOSAndroid,
} from 'react-native'
import React, { useState } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View className="flex my-auto flex-1 bg-[#dadada] ">

                    {/* first half of the page */}
                    <View className="flex py-2 mt-8">
                        <Image
                            source={Logo}
                            className="w-full mx-auto"
                            style={{
                                resizeMode: 'contain',
                                height: Dimensions.get('screen').height * 0.2,
                                width: Dimensions.get('screen').height * 0.1,
                            }}
                        />
                        {/* welcome back text  */}
                        <View className="px-8 space-y-2 -mt-6">
                            <Text className="text-center text-2xl font-bold text-gray-800">Create an Account</Text>
                            <Text className="text-center font-light text-gray-700">Please fill in the details to create an account</Text>
                        </View>
                    </View>

                    {/* second half of the page */}
                    <View className="flex flex-col space-y-5 mt-10" >

                        {/* Text input for the full names  */}
                        <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                            <Icon name="user" size={25} color="#c5c0c0" />
                            <TextInput
                                placeholder="Enter your Full Name"
                                placeholderTextColor={'#c5c0c0'}
                                className="w-full p-2 py-4"
                            />
                        </View>
                        <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                            <Icon name="inbox" size={25} color="#c5c0c0" />
                            <TextInput
                                keyboardType='email-address'
                                placeholder="Enter your email"
                                placeholderTextColor={'#c5c0c0'}
                                className="w-full p-2 py-4"
                            />
                        </View>

                        {/* Text input for the date of birth  */}
                        <TouchableOpacity onPress={showDatepicker} className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 border border-[#c5c0c0] rounded-lg ">
                            <TouchableOpacity className="flex flex-row items-center justify-start " onPress={showDatepicker} >
                                <Icon onPress={showDatepicker} name="calendar" size={25} color="#c5c0c0" />
                                <TouchableOpacity onPress={showDatepicker} className="w-full p-2 py-3">
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </TouchableOpacity>


                        {/* Text input for the password  */}
                        <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                            <Icon name="lock" size={25} color="#c5c0c0" />
                            <TextInput
                                secureTextEntry={true}
                                placeholder="Enter your Password"
                                placeholderTextColor={'#c5c0c0'}
                                className="w-[90%] p-2 py-4"
                            />
                            <Icon name="eye-slash" size={25} color="#c5c0c0" />
                        </View>

                        {/* forgot password part  */}
                        {/* <View className="flex-row justify-end items-end px-6">
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.push('ForgotPassword') }} className="">
                        <Text className="text-blue-900 font-bold">Forgot Password?</Text>
                    </TouchableOpacity>
                </View> */}

                        {/* button to press in-order to login */}
                        <View className="flex justify-center items-center pt-7 px-8">
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                                <Text className="text-white font-light">Log in </Text>
                            </TouchableOpacity>
                        </View>

                        {/* part for sign up  */}
                        <View className="flex flex-row justify-center items-center pt-7 px-8">
                            <Text className="flex justify-center items-center px-1 flex-row font-light">
                                Have an account ?
                            </Text>

                            {/* button for signup */}
                            <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.push('Login') }} className="">
                                <Text className="text-blue-900 font-light">Sign in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
