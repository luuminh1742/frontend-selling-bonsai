const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const CART_ADD = 'CART_ADD'
const CART_DELETE_ALL = 'CART_DELETE_ALL'

function ConstantTypeAction() {
    return (
        {
            LOGIN: () => LOGIN,
            LOGOUT: () => LOGOUT,
            CART_ADD: () => CART_ADD,
            CART_DELETE_ALL: () => CART_DELETE_ALL
        }
    )
}

export default ConstantTypeAction
