import { TV } from "../models/TV.js";
import { Cellphone } from "../models/Cellphone.js";
import { Bicycle } from "../models/Bicycle.js";
export class CartView {
    constructor(cartService) {
        this.cartService = cartService;
    }
    init() {
        this.updateCartView();
        this.bindAddToCartButtons();
    }
    bindAddToCartButtons() {
        document.querySelectorAll('.btn-primary').forEach((button) => {
            button.addEventListener('click', (event) => {
                const productType = event.target.getAttribute('data-product-type');
                let product;
                switch (productType) {
                    case 'bicycle':
                        product = new Bicycle("Bicicleta Modelo X", 26, "BikeCo", 1000);
                        break;
                    case 'cellphone':
                        product = new Cellphone("Celular Y", "128GB", "PhoneCo", 500);
                        break;
                    case 'tv':
                        product = new TV("TV Z", "4K", 55, "TVC", 1240);
                        break;
                }
                if (product) {
                    this.cartService.addToCart(product);
                    this.updateCartView();
                }
            });
        });
    }
    updateCartView() {
        const productList = this.cartService.getProductList();
        const totalPrice = this.cartService.getTotalPrice();
        const cartProductsListElement = document.getElementById('cartProductsList');
        const cartTotalPriceElement = document.getElementById('cartTotalPrice');
        if (cartProductsListElement && cartTotalPriceElement) {
            cartProductsListElement.textContent = productList.length > 0 ? productList.join(", ") : "Nenhum produto adicionado";
            cartTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }
}
