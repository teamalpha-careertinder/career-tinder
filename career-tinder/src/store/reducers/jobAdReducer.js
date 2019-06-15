const initState = {};

const jobAdReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_JOBPOST_SUCCESS":
      console.log("CREATE_JOBPOST_SUCCESS");
      return {
        ...state,
        response: "success",
        message: "Job opportunity has been created successfully."
      };
    case "CREATE_JOBPOST_ERROR":
      console.log("CREATE_JOBPOST_ERROR");
      return {
        ...state,
        response: "danger",
        message: "An error occured!"
      };
    case "UPDATE_JOBPOST_SUCCESS":
      console.log("UPDATE_JOBPOST_SUCCESS");
      return {
        ...state,
        response: "success",
        message: "Job opportunity has been updated successfully."
      };
    case "UPDATE_JOBPOST_ERROR":
      console.log("UPDATE_JOBPOST_ERROR");
      return {
        ...state,
        response: "danger",
        message: "An error occured!"
      };
    case "DELETE_JOBPOST_SUCCESS":
      console.log("DELETE_JOBPOST_SUCCESS");
      return {
        ...state,
        response: "success",
        message: "Job opportunity has been deleted successfully."
      };
    case "DELETE_JOBPOST_ERROR":
      console.log("DELETE_JOBPOST_ERROR");
      return {
        ...state,
        response: "danger",
        message: "An error occured!"
      };
    case "SAVE_USER_CHOICE_SUCCESS":
      console.log("SAVE_USER_CHOICE_SUCCESS");
      return {
        ...state,
        response: "success",
        message: "Your choice has been successfully saved."
      };
    case "SAVE_USER_CHOICE_ERROR":
      console.log("SAVE_USER_CHOICE_ERROR");
<<<<<<< HEAD
      return {
        ...state,
        response: "danger",
        message: "An error occured!"
      };
=======
      return state;
    case "SAVE_MATCH_SUCCESS":
        console.log("SAVE_MATCH_SUCCESS");
        return state;
    case "SAVE_MATCH_ERROR":
      console.log("SAVE_MATCH_ERROR");
      return state;

>>>>>>> execute matching when user likes a jobAd
    default:
      return state;
  }
};

export default jobAdReducer;
