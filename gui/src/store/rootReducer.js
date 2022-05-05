import {combineReducers} from "@reduxjs/toolkit";
import {default as tableReducer} from "./reducers/tableReducer";

/*
    * Merge all reducers in one root reducer, by now it's only one (tableReducer)
    * */
const appReducer = combineReducers({table: tableReducer,});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
