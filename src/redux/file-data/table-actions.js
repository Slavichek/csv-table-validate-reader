import { GET_CSV } from "./actions-types";

const setFileData = (payload) => ({
    type: GET_CSV,
    payload,
});
export default setFileData;
