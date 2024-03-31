export class Cart {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    getTotalPrice() {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }
    getProductList() {
        return this.products.map(product => product.getModel());
    }
    getProducts() {
        return this.products;
    }
    removeProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
    }
}
