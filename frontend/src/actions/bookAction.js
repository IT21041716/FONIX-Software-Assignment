import { bookConstants } from "./constants";
import { axiosInstance } from "../helpers/axios";
import { toast } from "react-hot-toast";

export const getBooks = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: bookConstants.RETRIVE_BOOKS_REQUEST });

      const res = await axiosInstance.get("/Book/fetchBook"); 
      if (res.status === 200) {
        dispatch({
          type: bookConstants.RETRIVE_BOOKS_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Books Fetched..!!", {
          id: "bk",
        });
      } else if (res.status === 400) {
        dispatch({
          type: bookConstants.RETRIVE_BOOKS_FAILURE,
        });
        toast.error("Books Fetching error..!!", {
          id: "bk1",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Server crashed..!");
        dispatch({
          type: bookConstants.RETRIVE_BOOKS_FAILURE,
        });
      }
    }
  };
};


export const bookdelete = (id) => {
  return async(dispatch) => {
    try {
      const form = {
        id : id
      }
      dispatch({type:bookConstants.DELETE_BOOK_REQUEST})
      const res = await axiosInstance.post("/Book/deleteBook",form)
      if(res.status === 200){
        dispatch({
          type: bookConstants.DELETE_BOOK_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Books Deleted..!!", {
          id: "up",
        });
      }else if(res.status === 400){
        dispatch({
          type: bookConstants.DELETE_BOOK_FAILED
        });
        toast.error("Books Delete Failed..!!", {
          id: "dt",
        });
      }

      
    } catch (error) {
      if (res.status === 500) {
        toast.error("Server crashed..!");
        dispatch({
          type: bookConstants.DELETE_BOOK_FAILED,
        });
      }
    }
  }
}

export const upgradeBook = (data) => {
  return async(dispatch) => {
    try {
      dispatch({type:bookConstants.UPDATE_BOOK_REQUEST})
      const res = await axiosInstance.post("/Book/updateBook",data)
      if(res.status === 201){
        dispatch({
          type: bookConstants.UPDATE_BOOK_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Books Updated..!!", {
          id: "up",
        });
      }else if(res.status === 400){
        dispatch({
          type: bookConstants.UPDATE_BOOK_FAILED
        });
        toast.error("Books Update Failed..!!", {
          id: "fd",
        });
      }

      
    } catch (error) {
      if (res.status === 500) {
        toast.error("Server crashed..!");
        dispatch({
          type: bookConstants.UPDATE_BOOK_FAILED,
        });
      }
    }
  }
}
export const AddBook = (data) => {
  return async(dispatch) => {
    try {
      dispatch({type:bookConstants.INSERT_BOOK_REQUEST})
      const res = await axiosInstance.post("/Book/insertBook",data)
      if(res.status === 201){
        dispatch({
          type: bookConstants.INSERT_BOOK_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Books Inserted..!!", {
          id: "up",
        });
      }else if(res.status === 400){
        dispatch({
          type: bookConstants.INSERT_BOOK_FALIURE
        });
        toast.success("Books Insert Failed..!!", {
          id: "fd",
        });
      }

      
    } catch (error) {
      if (res.status === 500) {
        toast.error("Server crashed..!");
        dispatch({
          type: bookConstants.INSERT_BOOK_FALIURE,
        });
      }
    }
  }
}