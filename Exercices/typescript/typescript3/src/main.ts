import { TV } from "./models/TV.js";
import { Cellphone } from "./models/Cellphone.js";
import { Bicycle } from "./models/Bicycle.js";
import { CartService } from "./services/CartService.js";
import { CartView } from "./views/CartView.js";

document.addEventListener("DOMContentLoaded", function() {
    const cartService = new CartService();
    const cartView = new CartView(cartService);
    cartView.init();
});
