export const cartAction = {
    ADD: (state, action) => {
        let newProducts = [...state.products]
        let checked = false
        for (let i = 0; i < newProducts.length; i++) {
            if (newProducts[i].id === action.productId) {
                newProducts[i].quantity += action.productQuantity
                checked = true
                break
            }
        }

        if (!checked) {
            newProducts.push({
                id: action.productId,
                name: action.productName,
                image: action.productImage,
                quantity: action.productQuantity,
                price: action.productPrice,
                discount: action.productDiscount
            })
        }
        return newProducts
    },
    UPDATE: (state, action) => {
        let newProducts = [...state.products]


        for (let i = 0; i < newProducts.length; i++) {
            if (newProducts[i].id === action.productId) {
                if (action.productQuantity > 0) {
                    newProducts[i].quantity = action.productQuantity
                    break
                }

            }
        }

        return newProducts
    },
    DELETE_ITEM: (state, action) => {
        let newProducts = [...state.products]
        
        let index = newProducts.findIndex((element) => element.id === action.id)
        
        newProducts.splice(index, 1)


        return newProducts
    }
}