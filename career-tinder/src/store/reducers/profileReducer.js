const initState = {}

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_JOBSEEKER_PROFILE_SUCCESS':
            console.log('create profile success');
            return state;
        case 'CREATE_JOBSEEKER_PROFILE_ERROR':
            console.log('create profile error');
            return state;
        case 'CREATE_EMPLOYER_PROJECT_SUCCESS':
            console.log('create profile error');
            return state;
        case 'CREATE_EMPLOYER_PROJECT_ERROR':
            console.log('create profile error');
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