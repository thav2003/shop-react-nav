import { createStore } from "redux";

import AuthUser from "./reducers/auth";



const store = createStore(AuthUser);

export default store;