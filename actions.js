
export const setCurrency = (currency) => {
    return {
        type: "currencyFilter/setCurrency",
        payload: currency
    };
}

export const loadData = (data) => {
    return {
        type: "inventory/loadData",
        payload: data
    };
}

export const addToCart = (itemToAdd) => {
    return {
        type: "cart/addToCart",
        payload: itemToAdd
    };
}

export const changeQuantity = (quantity) => {
    return {
        type: "cart/changeQuantity",
        payload: quantity
    }
}