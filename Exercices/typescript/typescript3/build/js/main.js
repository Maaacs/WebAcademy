import { CartService } from "./services/CartService.js";
import { CartView } from "./views/CartView.js";
document.addEventListener("DOMContentLoaded", function () {
    const cartService = new CartService();
    const cartView = new CartView(cartService);
    cartView.init();
});
