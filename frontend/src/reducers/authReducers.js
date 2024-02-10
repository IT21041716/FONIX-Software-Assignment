import { authConstants } from "../actions/constants";

const initState ={
    user: {},
    authenticated: false,
    authenticating: false,
    loading:false,
}

export default(state =initState,action) => {
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
        break
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticated:true,
                user:action.payload
            }
        break
        case authConstants.LOGIN_FALIURE:
            state = {
                ...state,
                authenticating: false,
            }
        break
        case authConstants.SIGN_UP_REQUEST:
            state = {
                ...state,
                loading: true,
            }
        break
        case authConstants.SIGN_UP_SUCCESS:
            state = {
                ...state,
                loading: false,
                user: action.payload,
            }
        break
        case authConstants.SIGN_UP_FAILURE:
            state = {
                ...state,
                loading: false,
            }
        break
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
                loading:true
            }
        break

        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initState
  
            }
        break
        case authConstants.LOGOUT_FAILED:
            state={
                ...state,
                loading:false
            }
        break

    }
    return state
}