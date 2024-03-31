import { Cart } from "../models/Cart.js";
export class CartService {
    constructor() {
        this.cart = new Cart();
    }
    addToCart(product) {
        this.cart.addProduct(product);
    }
    getTotalPrice() {
        return this.cart.getTotalPrice();
    }
    getCartDetails() {
        return this.cart.getProducts();
    }
    getProductList() {
        return this.cart.getProductList();
    }
    removeFromCart(productId) {
        this.cart.removeProduct(productId);
    }
}
