import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../assets/logos/Ctrl.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';



const LoginScreen = ({ navigation }) => {
    const { onLogin } = useAuth();
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // on login
    const handleLogin = async (values) => {
        try {
            console.log('Login values:', values);
            const result = await onLogin(values.email, values.password);
            console.log(result); // Log the result for debugging

            if (result && result.error) {
                setError('Something went wrong with your login');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    // validations for the login form
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password must not exceed 20 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Password is required'),
    });

    return (
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
                        <Text className="text-center text-2xl font-bold text-gray-800">Welcome Back!</Text>
                        <Text className="text-center font-light text-gray-800">Sign in to your account</Text>
                    </View>
                </View>


                {/* second half of the page */}
                <View className="flex flex-col space-y-5 mt-10" >
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (

                            <View View className="flex flex-col space-y-5">
                                {/* Text input for the email  */}
                                <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                                    <Icon name="user" size={25} color="#c5c0c0" />

                                    <TextInput
                                        keyboardType="email-address"
                                        placeholder="Enter your Email"
                                        placeholderTextColor={'#c5c0c0'}
                                        className="w-full p-2 py-4"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <View className="px-6">
                                        <Text className="text-red-500 text-sm">{errors.email}</Text>
                                    </View>
                                )}

                                {/* Text input for the password  */}
                                <View className="flex items-center justify-center flex-row px-8 mx-6 space-y-2 space-x-2 border border-[#c5c0c0] rounded-lg ">
                                    <Icon name="lock" size={25} color="#c5c0c0" />
                                    <TextInput
                                        placeholder="Enter your Password"
                                        placeholderTextColor={'#c5c0c0'}
                                        className="w-[90%] p-2 py-4"
                                        secureTextEntry={!showPassword}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <TouchableOpacity onPress={togglePasswordVisibility} >
                                        <Icon
                                            name={showPassword ? "eye-slash" : "eye"}
                                            size={24}
                                            color={showPassword ? '#888' : '#000'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && (
                                    <View className="px-6">
                                        <Text className="text-red-500 text-sm">{errors.password}</Text>
                                    </View>
                                )}
                                <View className="flex-row justify-end items-end px-6">
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.push('ForgotPassword') }} className="">
                                        <Text className="text-blue-900 font-bold">Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>


                                {/* forgot password part  */}


                                {/* button to press in-order to login */}
                                <View className="flex justify-center items-center pt-7 px-8">
                                    <TouchableOpacity onPress={handleSubmit} className="w-full bg-blue-900 py-3 items-center rounded-lg">
                                        <Text className="text-white font-light">Log in </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>

                    {/* part for sign up  */}
                    <View className="flex flex-row justify-center items-center pt-7 px-8">
                        <Text className="flex justify-center items-center px-1 flex-row font-light">
                            Don't have an account ?
                        </Text>

                        {/* button for signup */}
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.push('Register') }} className="">
                            <Text className="text-blue-900 font-light">Sign up</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});



export default LoginScreen
