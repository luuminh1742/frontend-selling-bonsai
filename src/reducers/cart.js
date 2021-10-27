import { cartAction } from "../actions/cart"


const initialState = {
    userId: null,
    products: [],
    subtotal:(products)=>{
        let total = 0
        for(let i = 0;i<products.length;i++){
            total += (products[i].price*(100-products[i].discount)/100) * products[i].quantity
        }
        return total
    },
    shipping:30000,
    total: (subtotal,shipping) => {return (subtotal+shipping)}
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_ADD': {
            let newProducts = cartAction.ADD(state, action)
            return {
                ...state,
                products: newProducts
            }
        }
        case 'CART_UPDATE': {
            let newProducts = cartAction.UPDATE(state, action)
            return {
                ...state,
                products: newProducts
            }
        }
        case 'CART_DELETE_ITEM': {
            let newProducts = cartAction.DELETE_ITEM(state, action)
            return {
                ...state,
                products: newProducts
            }
        }
        case 'CART_DELETE_ALL': {
            return {
                ...state,
                products: []
            }
        }

        default:
            return state;
    }
};
export default cartReducer;