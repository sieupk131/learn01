import { SET_AUTH, DEL_AUTH } from '../contexts/constants'
export const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                user: payload,
                authLoading: false,
                isAuthenticated: true
            }
        case DEL_AUTH:
            return {
                ...state,
                user: null,
                authLoading: false,
                isAuthenticated: false
            }
        default:
            return state
    }
}