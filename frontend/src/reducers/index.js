import { combineReducers } from "redux";
import authReducers from "./authReducers";
import bookReducer from "./bookReducer";

const rootReducer = combineReducers({
  auth: authReducers,
  book: bookReducer,
});

export default rootReducer;
