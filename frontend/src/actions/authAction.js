import { authConstants } from "./constants";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../helpers/axios";

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axiosInstance.post("/User/signin", data);
      if (res.status === 200) {
        const user = res.data.payload;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(
          `Login Success, Welcome ${user.FirstName} ${user.LastName} `,
          {
            id: "login",
          }
        );

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: user,
        });
      } else if (res.status === 401) {
        toast.error("Invalid Password..!");
        dispatch({
          type: authConstants.LOGIN_FALIURE,
        });
      } else if (res.status === 404) {
        toast.error("Invalid Email Address..!");
        dispatch({
          type: authConstants.LOGIN_FALIURE,
        });
      }
    } catch (error) {
      if (res.status === 500) {
        toast.error("Server crashed..!");
        dispatch({
          type: authConstants.LOGIN_FALIURE,
        });
      }
    }
  };
};

export const userRegister = (user, log) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGN_UP_REQUEST });
      const res = await axiosInstance.post("/User/signup", user);
      if (res.status === 201) {
        dispatch(userLogin(log));
        dispatch({
          type: authConstants.SIGN_UP_SUCCESS,
          payload: res.data.payload,
        });
      } else {
        if (res.status === 400) {
          toast.error("Somthing Went Wrong In Account Creating..!");
          dispatch({
            type: authConstants.SIGN_UP_FAILURE
          });
        } else if (res.status === 100) {
          toast.error("Email Already Registered...!");
          dispatch({
            type: authConstants.SIGN_UP_FAILURE,
          });
        }
      }
    } catch (error) {
      if (res.status === 500) {
        toast.error("Server crashed..!");
        dispatch({
          type: authConstants.SIGN_UP_FAILURE,
        });
      }
    }
  };
};


export const isLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload:user
                })
            }

        } else {
            dispatch({
                type: authConstants.LOGIN_FALIURE,
                payload: { error: 'Failed to login' }
            })
        }
    }
}


export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        localStorage.clear();
        const res = await axiosInstance.delete("/User/signout")
        if(res === 200){
          dispatch({type:authConstants.LOGOUT_SUCCESS})
          toast.success("Logout Successfully..!!",{
            id: "logout"
          });
        }else{
          dispatch({type:authConstants.LOGOUT_FAILED})
          toast.error("Logout Failed..!");
        }
    }
}