import {combineReducers} from "@reduxjs/toolkit";
import {default as tableReducer} from "./reducers/tableReducer";

const appReducer = combineReducers({table: tableReducer,});

const rootReducer = (state, action) => {
    // if (action.type === "AUTH_LOGOUT") {
    //     return appReducer(undefined, action);
    // }
    return appReducer(state, action);
};

export default rootReducer;
