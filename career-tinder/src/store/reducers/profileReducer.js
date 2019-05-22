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
        default:
            return state;
    }
};

export default profileReducer;