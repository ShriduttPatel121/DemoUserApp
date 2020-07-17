import * as actionTypes from './actionTypes';
import axios from 'axios';


const END_POINT = 'http://localhost:62488/api/DemoUser';

export const setAuthtoTrue = () => {
    return {
        type : actionTypes.SET_AUTH_STATUS_TRUE,
        payload : true,
        loading : false
    }
};

export const setAuthtoFalse = () => {
    return {
        type : actionTypes.SET_AUTH_STATUS_FALSE,
        payload : false
    }
};


//login section
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        let url = END_POINT +'?Email='+email + '&Password=' + password;
        axios.get(url)
        .then(res => {
            console.log(res.data);
            dispatch(authSuccess(res.data));
        })
        .catch( error => {
            console.log(error);
            dispatch(authFail())
        });
    }


}

const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

const authSuccess = (currentUser) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        currentUser : currentUser
    }
}

const authFail = () => {
    return {
        type : actionTypes.AUTH_FAIL,
        message : 'Your email or password is not correct.'
    }
}

//CURRENT ADMIN'S USER LIST
export const fetchCurrentUsersList = (adminId) => {
    return dispatch => {
        dispatch(fetchCurrentUsersListStart())
        let url = END_POINT + '/' + adminId;
        axios.get(url)
        .then(res=> {
            //console.log(res.data);
            dispatch(fetchCurrentUsersListSuccess(res.data));

        })
        .catch( error=> {
            console.log(error);
        })
    }
}

const fetchCurrentUsersListStart = () => {
    return {
        type : actionTypes.FETCH_CURRENT_ADMIN_USERS_START
    }
}

const fetchCurrentUsersListSuccess = (currentUsersList) => {
    return {
        type : actionTypes.FETCH_CURRENT_ADMIN_USERS_SUCCESS,
        currentUsersList : currentUsersList
    }
}

//POSTING NEW SIMPLE USER........
export const postNewSimpleUser = (formData, currentUserId) => {
    return dispatch => {
        dispatch(postNewSimpleUserStart());
        let url = END_POINT + '/'+ currentUserId;
        const simpleUserData = {
            Email : formData.email,
            UserName : formData.name,
            Password : formData.password
        }
        axios.post(url, simpleUserData)
        .then( res => {
            dispatch(postNewSimpleUserSuccess(res.data));
        })
        .catch( error => {
            console.log(error);
            dispatch(postNewSimpleUserFail())
        })
    }
}

const postNewSimpleUserStart = () => {
    return {
        type : actionTypes.POST_NEW_SIMPLE_USER_START
    }
}

const postNewSimpleUserSuccess = (newSimpleUser) => {
    return {
        type : actionTypes.POST_NEW_SIMPLE_USER_SUCCESS,
        newSimpleUser : newSimpleUser
    }
}

const postNewSimpleUserFail = () => {
    return {
        type : actionTypes.POST_NEW_SIMPLE_USER_FAIL
    }
}

//POSTING NEW ADMIN USER..........
export const postNewAdminUser = (formData) => {
    return dispatch => {
        dispatch(postNewAdminUserStart())
        let adminUser = {
            Email : formData.email,
            UserName : formData.name,
            Password : formData.password
        };
        axios.post(END_POINT, adminUser)
        .then( res => {
            dispatch(postNewAdminUserSuccess())
        })
        .catch( error => {
            console.log(error);
            dispatch(postNewAdminUserFail());
        });
    }
}

const postNewAdminUserStart = () => {
    return {
        type : actionTypes.POST_NEW_ADMIN_USER_START
    }
}

const postNewAdminUserSuccess = () => {
    return {
        type : actionTypes.POST_NEW_ADMIN_USER_SUCCESS
    }
}

const postNewAdminUserFail = () => {
    return {
        type : actionTypes.POST_NEW_ADMIN_USER_FAIL
    }
}

// geting adimn list for all-user
export const getAllAdmins = () => {
    return dispatch => {
        dispatch(getAllAdminsStart())
        axios.get(END_POINT)
        .then( res => {
            dispatch(getAllAdminsSuccess(res.data))
        })
        .catch( error => {
            console.log(error);
            dispatch(getAllAdminsFail());
        })
    }
}

const getAllAdminsStart = () => {
    return {
        type : actionTypes.GET_ALL_ADMINS_START
    }
}

const getAllAdminsSuccess = (adminList) => {
    return {
        type : actionTypes.GET_ALL_ADMINS_SUCCESS,
        adminList : adminList
    }
}

const getAllAdminsFail = () => {
    return {
        type : actionTypes.GET_ALL_ADMINS_FAIL
    }
}

// getting simple user list when clicked on admin user tab....

export const getSimpleUsersWhenClicked = (Id) => {
    return dispatch => {
        dispatch(getSimpleUsersWhenClickedStart());
        const url = END_POINT + '/' + Id;
        console.log(url);
        axios.get(url)
        .then( res => {
            console.log(res.data);
            //let id = Id.toString()
            dispatch(getSimpleUsersWhenClickedSuccess( res.data, Id));
        })
        .catch( error => {
            console.log(error);
            dispatch(getSimpleUsersWhenClickedFail());
        })
    }
}

const getSimpleUsersWhenClickedStart= () => {
    return {
        type : actionTypes.FETCH_SIMPLE_USERS_START
    }
}

const getSimpleUsersWhenClickedSuccess= (simpleUserList, Id) => {
    return {
        type : actionTypes.FETCH_SIMPLE_USERS_SUCCESS,
        simpleUserList : simpleUserList,
        Id : Id
    }
}

const getSimpleUsersWhenClickedFail = () => {
    return {
        type : actionTypes.FETCH_SIMPLE_USERS_FAIL
    }
}