import { Cart } from "../models/Cart.js";
import { IProduct } from "../models/Product.js";

export class CartService {
    private cart: Cart;

    constructor() {
        this.cart = new Cart();
    }

    addToCart(product: IProduct): void {
        this.cart.addProduct(product);
    }

    getTotalPrice(): number {
        return this.cart.getTotalPrice();
    }

    getProductList(): string[] {
        return this.cart.getProductList();
    }
}
