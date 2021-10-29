import { createContext, useReducer, useEffect, useCallback } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH, DEL_AUTH } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //Authentication user
    const loadUser = useCallback(async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({ type: SET_AUTH, payload: response.data.user })
                return { success: true, message: response.data.message }
            }
            else {
                dispatch({ type: DEL_AUTH })
                return { success: false, message: response.data.message }
            }
        } catch (error) {
            console.log(error)
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({ type: DEL_AUTH })
            return (error.response.data) ? error.response.data : { success: false, message: 'Server error' }
        }
    }, [])
    useEffect(() => loadUser(), [loadUser])

    //Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    //Register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            console.log(response.data.accessToken)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    //Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({ type: DEL_AUTH })
    }

    //Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState }

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider