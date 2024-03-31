import { Product } from "./Product.js";
export class Bicycle extends Product {
    constructor(model, wheelSize, manufacturer, price) {
        super(model, price, manufacturer);
        this.wheelSize = wheelSize;
    }
    getWheelSize() {
        return this.wheelSize;
    }
    getDetails() {
        return `Wheel Size: ${this.wheelSize}"`;
    }
}
