import { inventoryData as data } from "./data.js";
import { loadData, addToCart, changeQuantity } from "./actions.js";
import { store } from "./store.js";


store.dispatch(loadData(data));

const inventoryData = store.getState().inventory;

const render = () => {
 
    inventoryData.forEach((item) => {
    
        const itemsSelector = document.getElementById("items");
    
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
    
        const imgContainerDiv = document.createElement("div");
        imgContainerDiv.className = "image-container";
    
        itemDiv.appendChild(imgContainerDiv);
    
        const image = document.createElement("img");
        image.setAttribute("src", item.img);
        imgContainerDiv.appendChild(image);
    
        const ItemTtitleH2 = document.createElement("h2");
        ItemTtitleH2.appendChild(document.createTextNode(item.name));
        itemDiv.appendChild(ItemTtitleH2);
    
        const priceH2 = document.createElement("h2");
        priceH2.className = "price";
        itemDiv.appendChild(priceH2);
    
        const currencySymbolSpan = document.createElement("span");
        currencySymbolSpan.className = "currency-symbol";
        priceH2.appendChild(currencySymbolSpan);
        priceH2.appendChild(document.createTextNode(item.price));
        currencySymbolSpan.appendChild(document.createTextNode("$"));
    
        const addBtn = document.createElement("button");
        addBtn.className = "add-to-cart-btn";
        addBtn.addEventListener("click", () => {
            store.dispatch(addToCart({name: item.name, price: item.price}));
        });
        addBtn.appendChild(document.createTextNode("Add to Cart"));
        itemDiv.appendChild(addBtn);
    
        itemsSelector.appendChild(itemDiv);
    
    });
}

render();

function addItemToCart(){
    const items = store.getState().cart;
    const cartItemSelector = document.getElementById("cart-item-container");
    const element = document.querySelectorAll(".cart-item");

    if(element.length > 0){
        element.forEach((element) => {
            cartItemSelector.removeChild(element);
        });
    }

    let total = 0.00;
    for(let item in items){
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        const itemTitleH4 = document.createElement("h4");
        itemTitleH4.appendChild(document.createTextNode(item));
        cartItemDiv.appendChild(itemTitleH4);
        
        const selectInput = document.createElement("select");
        selectInput.id = "item-quantity";
    
        for(let i = 1; i <= 100; i++){
            const option = document.createElement("option");
            option.setAttribute("value", i);
            option.appendChild(document.createTextNode(i));
            selectInput.appendChild(option);
        }
    
        cartItemDiv.appendChild(selectInput);

        selectInput.value = items[item].quantity;
        const totalSelector = document.getElementById("total");
        total = total + items[item].quantity * items[item].price;
        totalSelector.innerText = Math.round((total + Number.EPSILON) * 100) / 100;

    
        cartItemSelector.appendChild(cartItemDiv);

        selectInput.addEventListener("change", (e) => {
            changeItemQuantity(item, e.target.value);
        });
    }
}

function changeItemQuantity(item, newQuantity){
    store.dispatch(changeQuantity({name: item, quantity: newQuantity}));
}

store.subscribe(addItemToCart);


