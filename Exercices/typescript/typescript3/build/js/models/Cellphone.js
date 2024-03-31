import { Product } from "./Product.js";
export class Cellphone extends Product {
    constructor(model, memory, manufacturer, price) {
        super(model, price, manufacturer);
        this.memory = memory;
    }
    getMemory() {
        return this.memory;
    }
    getDetails() {
        return `Memory: ${this.memory}`;
    }
}
