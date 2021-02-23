// import { createStore, applyMiddleware } from "redux";
// import rootReducer from "./root-reducer";

// export const store = createStore(rootReducer);

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
console.log(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
window.store = store;
export default store;
