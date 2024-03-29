export class Product {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
    getModel() {
        return this.model;
    }
    getPrice() {
        return this.price;
    }
}
