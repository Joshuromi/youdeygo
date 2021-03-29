import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import ridesReducer from "./rides/rides.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "rides"],
};

const rootReducer = combineReducers({
  user: userReducer,
  rides: ridesReducer,
});

export default persistReducer(persistConfig, rootReducer);
