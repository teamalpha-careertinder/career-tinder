const initState = {};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_JOBSEEKER_PROFILE_SUCCESS":
      console.log("update jobseeker profile success");
      return state;
    case "UPDATE_JOBSEEKER_PROFILE_ERROR":
      console.log("update jobseeker profile error");
      return state;
    case "UPDATE_EMPLOYER_PROFILE_SUCCESS":
      console.log("update employer profile success");
      return state;
    case "UPDATE_EMPLOYER_PROFILE_ERROR":
      console.log("update employer profile error");
      return state;
    //@begin Change Password - Abel
    case "PWCHANGE_SUCCESS":
      console.log("Password Change - success");
      return {
        ...state,
        authStatus: "OK",
        authMsg: "Password successfully changed."
      };
    case "PWCHANGE_ERROR":
      console.log("Password Change - error");
      return {
        ...state,
        authStatus: "ERROR",
        authMsg: action.err.message
      };
    //@end Change Password - Abel
    default:
      return state;
  }
};

export default profileReducer;
