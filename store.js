const { createStore, combineReducers } = Redux;
import { inventoryReducer } from "./reducers.js";
import { cartReducer } from "./reducers.js";

const rootReducer = combineReducers({
    inventory: inventoryReducer, 
    cart: cartReducer
});

export const store = createStore(rootReducer);