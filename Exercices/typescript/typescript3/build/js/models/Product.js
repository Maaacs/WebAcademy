export class Product {
    constructor(model, price, manufacturer) {
        this.model = model;
        this.price = price;
        this.manufacturer = manufacturer;
        this.id = Math.random().toString(36).substr(2, 9);
    }
    getModel() {
        return this.model;
    }
    getPrice() {
        return this.price;
    }
    getManufacturer() {
        return this.manufacturer;
    }
}
