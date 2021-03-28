const INITIAL_STATE = {
  rides: {},
};

const ridesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_RIDES":
      return {
        ...state,
        rides: action.payload,
      };
    case "REMOVE_RIDES":
      return {
        ...state,
        rides: {},
      };
    default:
      return state;
  }
};

export default ridesReducer;
