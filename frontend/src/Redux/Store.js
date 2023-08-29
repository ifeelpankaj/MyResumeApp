import { configureStore } from "@reduxjs/toolkit";
import {userReducer,loginReducer, updateReducer} from "../Redux/Reducers/UserReducer"
const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    update: updateReducer,
  },
});

export default store;
