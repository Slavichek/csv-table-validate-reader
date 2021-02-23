import { combineReducers } from "redux";
import tableReducer from "./file-data/table-reducer";

const rootReducer = combineReducers({
    tableReducer,
});

export default rootReducer;
