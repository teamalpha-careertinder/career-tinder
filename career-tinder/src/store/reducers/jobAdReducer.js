const initState = {};

const jobAdReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_JOBPOST_SUCCESS":
      console.log("CREATE_JOBPOST_SUCCESS");
      return state;
    case "CREATE_JOBPOST_ERROR":
      console.log("CREATE_JOBPOST_ERROR");
      return state;
    case "UPDATE_JOBPOST_SUCCESS":
      console.log("UPDATE_JOBPOST_SUCCESS");
      return state;
    case "UPDATE_JOBPOST_ERROR":
      console.log("UPDATE_JOBPOST_ERROR");
      return state;
    case "DELETE_JOBPOST_SUCCESS":
      console.log("DELETE_JOBPOST_SUCCESS");
      return state;
    case "DELETE_JOBPOST_ERROR":
      console.log("DELETE_JOBPOST_ERROR");
      return state;
    case "SAVE_USER_CHOICE_SUCCESS":
      console.log("SAVE_USER_CHOICE_SUCCESS");
      return state;
    case "SAVE_USER_CHOICE_ERROR":
      console.log("SAVE_USER_CHOICE_ERROR");
      return state;
    case "SAVE_MATCH_SUCCESS":
        console.log("SAVE_MATCH_SUCCESS");
        return state;
    case "SAVE_MATCH_ERROR":
      console.log("SAVE_MATCH_ERROR");
      return state;

    default:
      return state;
  }
};

export default jobAdReducer;
