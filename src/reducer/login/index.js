const initialState = {
    user: [] || localStorage.getItem("user"),
    isLoggedIn: localStorage.getItem("user") ? true : false,
  };
  
  const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "LOG_IN":
        return {
          user: payload,
          isLoggedIn: true,
        };
      case "LOG_OUT":
        return {
          user: [],
          isLoggedIn: false,
        };
  
      default:
        return state;
    }
  };
  
  export default loginReducer;
  
  export const login = (user) => {
    return { type: "LOG_IN", payload: user };
  };
  
  export const logout = () => {
    return { type: "LOG_OUT" };
  };
  