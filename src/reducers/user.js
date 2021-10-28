const getLocalStore = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user !== null) {
        return {
            Id: user.Id,
            Email: user.Email,
            FullName: user.FullName,
            RoleCode: user.RoleCode,
            Phone: user.Phone,
            Address: user.Address
        }
    }
    return {
        Id: null,
        Email: null,
        FullName: null,
        RoleCode: null,
        Phone: null,
        Address: null
    }
}



const initialState = getLocalStore();

/**
 * 
 * @param {*} state 
 * @param {*} action {
        Id: ...,
        Email: ...,
        FullName: ...,
        RoleCode: ...
    }
 * @returns 
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            let newData = {
                Id: action.Id,
                Email: action.Email,
                FullName: action.FullName,
                RoleCode: action.RoleCode,
                Phone: action.Phone,
                Address: action.Address
            }
            window.localStorage.setItem('user', JSON.stringify(newData))
            return {
                ...state,
                ...newData
            }
        }
        case 'ACCOUNT_UPDATE': {
            let newDataUpdate = {
                Id: action.Id,
                Email: action.Email,
                FullName: action.FullName,
                RoleCode: action.RoleCode,
                Phone: action.Phone,
                Address: action.Address
            }
            window.localStorage.setItem('user', JSON.stringify(newDataUpdate))
            return {
                ...state,
                ...newDataUpdate
            }
        }
        case 'LOGOUT': {
            window.localStorage.removeItem('user')
            return {
                ...state,
                Id: null,
                Email: null,
                FullName: null,
                RoleCode: null
            }
        }
        default:
            return state;
    }
};
export default userReducer;