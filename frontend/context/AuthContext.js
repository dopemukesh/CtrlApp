import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const TOKEN_KEY = 'token';
export const API_URL = 'https://kaybrian4.pythonanywhere.com/';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [AuthState, setAuthState] = useState({
        token: null,
        authenticated:null,
    })

    // once the app starts up, check if there is a token
    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Stored Token: ", token)
            if (token) {
                // set the token in the http header
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // if there is a token set the authenticated to true
                setAuthState({
                    token: token,
                    authenticated:true,
                })
            }
        }
        bootstrapAsync();
    }, [])

    const register = async (name, email,date_of_birth, password) => {
        try {
            const response = await axios.post(`${API_URL}user/register/`, {
                fullname: name,
                email: email,
                date_of_birth: date_of_birth,
                password: password,
                re_password: password,
            });
            return response
        } catch (error) {
            return error
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}user/login/`, {
                email: email,
                password: password,
            });
            const data = response.data

            // set the token and authenticated to true
            setAuthState({
                token: data.access,
                authenticated:true,
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            await SecureStore.setItemAsync(TOKEN_KEY, data.access);
        } catch (error) {
            return error
        }
    }

    const logout = async () => {
        // delete the token from the local storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // update the http headers of axios
        axios.defaults.headers.common['Authorization'] = ""


        // set the token to null
        setAuthState({
            token: null,
            authenticated:false,
        })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        AuthState,
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
