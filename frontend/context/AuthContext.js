import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";



export const API_URL = 'https://kaybrian4.pythonanywhere.com/';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const checkTokenExpiration = async (token) => {
    const response = await fetch(`${API_URL}user/verify-token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
        }),
    });
    if (response.status === 200) {
        // Token is valid
        return true;
    } else {
        // Token verification failed
        return false;
    }
};




export const AuthProvider = ({ children }) => {
    const [AuthState, setAuthState] = useState({
        token: null,
        authenticated: null,
    })

    // once the app starts up, check if there is a token
    useEffect(() => {
        const bootstrapAsync = async () => {
            let accessToken = await SecureStore.getItemAsync('accessToken');
            let refreshToken = await SecureStore.getItemAsync('refreshToken');

            if (accessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                setAuthState({
                    token: accessToken,
                    authenticated: true,
                });

                // Check if the access token is expired
                const isTokenExpired = await checkTokenExpiration(accessToken);
                if (!isTokenExpired) {
                    // Access token is expired, try to refresh
                    try {
                        const refreshResponse = await axios.post(`${API_URL}user/login/refresh/`, {
                            refresh: refreshToken,
                        });
                        const newAccessToken = refreshResponse.data.access;
                        console.log(newAccessToken);
                        await SecureStore.setItemAsync('accessToken', newAccessToken);
                        setAuthState({
                            token: newAccessToken,
                            authenticated: true,
                        });
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    } catch (refreshError) {
                        // Refresh token is also expired, perform logout
                        await logout();
                    }
                }
            }
        };
        bootstrapAsync();
    }, [])

    const register = async (name, email, date_of_birth, password) => {
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

            // set the access and refresh tokens
            await SecureStore.setItemAsync('accessToken', data.access);
            await SecureStore.setItemAsync('refreshToken', data.refresh);

            // set the token and authenticated to true
            setAuthState({
                token: data.access,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        } catch (error) {
            return error
        }
    }

    const logout = async () => {
        // delete the token from the local storage
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        // update the http headers of axios
        axios.defaults.headers.common['Authorization'] = ""


        // set the token to null
        setAuthState({
            token: null,
            authenticated: false,
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
