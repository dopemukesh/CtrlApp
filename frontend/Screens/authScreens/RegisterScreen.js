import React, { useState } from 'react';
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
} from 'react-native';
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../context/AuthContext';
import axios from 'axios';


const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [errorRequest, setErrorRequest] = useState("");

    const handleSubmitRegister = async (values) => {
        try {
            const response = await axios.post(`${API_URL}user/register/`, {
                fullname: values.fullName,
                email: values.email,
                date_of_birth: moment(date).format('YYYY-MM-DD'),
                password: values.password,
                password2: values.password,
            });

            if (response.status === 201) {
                navigation.navigate('Login');
            } else {
                setErrorRequest(response.data);
            }
        } catch (error) {
            setErrorRequest(error.response.data);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View className="flex flex-1 space-y-1 my-auto bg-[#dadada] ">

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

                    <Formik
                        initialValues={{ fullName: '', email: '', password: '' }}
                        validationSchema={Yup.object().shape({
                            fullName: Yup.string().required('Full Name is required'),
                            email: Yup.string().email('Invalid email address').required('Email is required'),
                            password: Yup.string()
                                .min(8, 'Password must be at least 8 characters')
                                .max(20, 'Password must not exceed 20 characters')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                                )
                                .required('Password is required'),

                        })}
                        onSubmit={handleSubmitRegister}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (

                            <View className="space-y-3">
                                {/* Text input for the full names  */}
                                <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                                    <Icon name="user" size={25} color="#c5c0c0" />
                                    <TextInput
                                        placeholder="Enter your Full Name"
                                        placeholderTextColor="#c5c0c0"
                                        className="w-full p-2 py-4"
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}
                                    />
                                </View>
                                {touched.fullName && errors.fullName && <Text className="text-red-500 px-8">{errors.fullName}</Text>}


                                <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                                    <Icon name="inbox" size={25} color="#c5c0c0" />
                                    <TextInput
                                        keyboardType="email-address"
                                        placeholder="Enter your email"
                                        placeholderTextColor="#c5c0c0"
                                        className="w-full p-2 py-4"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>
                                {touched.email && errors.email && <Text className="text-red-500 px-8">{errors.email}</Text>}


                                {/* Text input for the date of birth  */}
                                <TouchableOpacity onPress={showDatepicker} className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 border border-[#c5c0c0] rounded-lg ">
                                    <TouchableOpacity className="flex flex-row items-center justify-start " onPress={showDatepicker} >
                                        <Icon onPress={showDatepicker} name="calendar" size={25} color="#c5c0c0" />
                                        <TouchableOpacity onPress={showDatepicker} className="w-full  p-2 py-3">
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                onChange={onChange}
                                                style={{ width: '100%' }}  // Set the width to 100%
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
                                        placeholderTextColor="#c5c0c0"
                                        className="w-[90%] p-2 py-4"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <Icon name="eye-slash" size={25} color="#c5c0c0" />
                                </View>
                                {touched.password && errors.password && <Text className="text-red-500 px-8">{errors.password}</Text>}
                                {errorRequest ? (
                                    <View className="px-8">
                                        <Text className="text-red-500 font-semibold mb-2">Error:</Text>
                                        {Object.entries(errorRequest).map(([key, value]) => (
                                            <Text key={key} className="text-red-500 ">
                                                <Text className="font-bold ">{capitalizeFirstLetter(key)}</Text> - {value[0]}
                                            </Text>
                                        ))}
                                    </View>
                                ) : null}

                                {/* button to press in-order to login */}
                                <View className="flex justify-center items-center pt-7 px-8">
                                    <TouchableOpacity onPress={handleSubmit} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                                        <Text className="text-white font-light">Sign up </Text>
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
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}



export default RegisterScreen
