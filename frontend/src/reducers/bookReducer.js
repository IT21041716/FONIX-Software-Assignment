import { bookConstants } from "../actions/constants";

const initState ={
    books: [],
    loading:false,
}

export default(state =initState,action) => {
    switch(action.type){
        case bookConstants.RETRIVE_BOOKS_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break
        case bookConstants.RETRIVE_BOOKS_SUCCESS:
            state = {
                ...state,
                loading: false,
                books:action.payload
            }
        break
        case bookConstants.RETRIVE_BOOKS_FAILURE:
            state = {
                ...state,
                loading: false,
            }
        break
        case bookConstants.DELETE_BOOK_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break
        case bookConstants.DELETE_BOOK_SUCCESS:
            state = {
                ...state,
                loading: false,
                books:action.payload
            }
        break
        case bookConstants.DELETE_BOOK_FAILED:
            state = {
                ...state,
                loading: false,
            }
        break
        case bookConstants.INSERT_BOOK_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break
        case bookConstants.INSERT_BOOK_SUCCESS:
            state = {
                ...state,
                loading: false,
                books:action.payload
            }
        break
        case bookConstants.INSERT_BOOK_FALIURE:
            state = {
                ...state,
                loading: false,
            }
        break
        case bookConstants.UPDATE_BOOK_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break
        case bookConstants.UPDATE_BOOK_SUCCESS:
            state = {
                ...state,
                loading: false,
                books:action.payload
            }
        break
        case bookConstants.UPDATE_BOOK_FAILED:
            state = {
                ...state,
                loading: false,
            }
        break
    }
    return state
}