import { addRideToRides } from "./rides.utils";

const INITIAL_STATE = {
  userRides: [],
};

const ridesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_RIDES":
      return {
        ...state,
        userRides: addRideToRides(state.userRides, action.payload),
      };
    case "REMOVE_RIDES":
      return {
        ...state,
        userRides: [],
      };
    default:
      return state;
  }
};

export default ridesReducer;
