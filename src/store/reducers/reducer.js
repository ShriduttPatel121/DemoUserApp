import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAutneticated : null,
    allUsers : [],
    loading : false,
    currentUser : null,
    authFailMessage : '',
    authuccess : false,
    currentUsersList : [],
    adminCreation : false
};

const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case actionTypes.SET_AUTH_STATUS_TRUE:
            return{
                ...state,
                isAutneticated : true
            };
        case actionTypes.SET_AUTH_STATUS_FALSE:
            return {
                ...state,
                isAutneticated : null,
                allUsers : [],
                loading : false,
                currentUser : null,
                authFailMessage : '',
                authuccess : false,
                currentUsersList : [],
                adminCreation : false
            };
        case actionTypes.ADD_USER:
            const oldList = [...state.allUsers];
            const newList = oldList.concat(action.payload);
            return {
                ...state,
                allUsers : newList
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading : true
            }
        
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading : false,
                authuccess : true,
                isAutneticated : true,
                currentUser : { ...action.currentUser}
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading : false,
                isAutneticated : false,
                authFailMessage : action.message
            }
        
        case actionTypes.FETCH_CURRENT_ADMIN_USERS_START:
            return {
                ...state,
                loading : true
            }

        case actionTypes.FETCH_CURRENT_ADMIN_USERS_SUCCESS:
            let holderArry = [];
            let copiedArray = holderArry.concat(action.currentUsersList);
            return {
                ...state,
                loading : false,
                currentUsersList : copiedArray

            }
        
        case actionTypes.FETCH_CURRENT_ADMIN_USERS_FAIL:
            return {
                ...state,
                loading : false
            }

        case actionTypes.POST_NEW_SIMPLE_USER_START:
            return {
                ...state,
                loading : true
            }
        
        case actionTypes.POST_NEW_SIMPLE_USER_SUCCESS:
            let currentList = [...state.currentUsersList]
            let updatedList = currentList.concat(action.newSimpleUser);
            return {
                ...state,
                loading : false,
                currentUsersList : updatedList
            }
        
        case actionTypes.POST_NEW_SIMPLE_USER_FAIL:
            return {
                ...state,
                loading : false
            }
        
        case actionTypes.POST_NEW_ADMIN_USER_START: 
            return {
                ...state,
                loading : true
            }
        case actionTypes.POST_NEW_ADMIN_USER_SUCCESS:
            return {
                ...state,
                adminCreation : true,
                loading : false
            }

        case actionTypes.POST_NEW_ADMIN_USER_FAIL:
            return {
                ...state,
                adminCreation : false,
                loading : false
            }
        
        case actionTypes.GET_ALL_ADMINS_START:
            return {
                ...state,
                loading : true
            }
        case actionTypes.GET_ALL_ADMINS_FAIL:
            return {
                ...state,
                loading : false
            }

        case actionTypes.GET_ALL_ADMINS_SUCCESS:
            let adminList = [...action.adminList];
            let updatedAllUsers = [];
            let tempArry = [];
            for (let ele of adminList)
            {
                let tempObj = {
                    adminData : {},
                    simpleUsers : []
                }
                tempObj.adminData = {...ele};
                tempArry.push(tempObj);
            }
            updatedAllUsers = [...tempArry];
            return {
                ...state,
                allUsers : updatedAllUsers,
                loading : false
            }
        
        case actionTypes.FETCH_SIMPLE_USERS_START:
            return {
                ...state,
                loading : true
            }
        
        case actionTypes.FETCH_SIMPLE_USERS_FAIL:
            return {
                ...state,
                loading : false
            }
        
        case actionTypes.FETCH_SIMPLE_USERS_SUCCESS:
            let oldAllUsers = [...state.allUsers];
            let index = oldAllUsers.findIndex(u => u.adminData.Id === action.Id);
            oldAllUsers[index].simpleUsers = [...action.simpleUserList]
            updatedAllUsers = [...oldAllUsers];
            return {
                ...state,
                loading : false,
                allUsers : oldAllUsers
            }
        default:
            return state;
    }
}

export default reducer;

/* allUsers :   [ 
                    {
                        adminData: {}
                        simpleUsers : [{},{},....]
                    },
                    {
                        adminData: {}
                        simpleUsers : [{},{},....]
                    }
                ] 
*/