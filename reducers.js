
const initialInventory = [];
export const inventoryReducer = (inventory = initialInventory, action) => {
    switch(action.type){
        case "inventory/loadData": {
            return [...action.payload];
        }
        default:
            return inventory;
    }
}

const initialCart = {};
export const cartReducer = (cart = initialCart, action) => {
    switch(action.type){
        case "cart/addToCart": {
            const { name, price } = action.payload;
            const quantity = cart[name] ? cart[name].quantity + 1 : 1;
            const newItem = { price, quantity};

            return {
                ...cart,
                [name]: newItem
            }
        }
        case "cart/changeQuantity": {
            const { name, quantity } = action.payload;
            const itemToUpdate = cart[name];
            const updatedItem = {...itemToUpdate, quantity};

            return {
                ...cart,
                [name]: updatedItem
            }
        }
        default:
            return cart;
    }
}
