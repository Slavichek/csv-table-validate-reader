import { GET_CSV } from "./actions-types";
const initialState = {
    tableData: [],
};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CSV:
            return {
                ...state,
                tableData: action.payload,
            };
        default:
            return state;
    }
};
export default tableReducer;
