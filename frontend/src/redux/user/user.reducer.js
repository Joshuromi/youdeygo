const INITIAL_STATE = {
  currentUser: {
    firstName: "",
    lastName: "",
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        currentUser: {
          firstName: "",
          lastName: "",
        },
      };
    default:
      return state;
  }
};

export default userReducer;
