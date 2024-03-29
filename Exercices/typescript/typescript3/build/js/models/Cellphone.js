import { Product } from "./Product.js";
export class Cellphone extends Product {
    constructor(model, memory, manufacturer, price) {
        super(model, price);
        this.memory = memory;
        this.manufacturer = manufacturer;
    }
    getMemory() {
        return this.memory;
    }
    getManufacturer() {
        return this.manufacturer;
    }
}
