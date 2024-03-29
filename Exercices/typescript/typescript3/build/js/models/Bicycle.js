import { Product } from "./Product.js";
export class Bicycle extends Product {
    constructor(model, wheelSize, manufacturer, price) {
        super(model, price);
        this.wheelSize = wheelSize;
        this.manufacturer = manufacturer;
    }
    getWheelSize() {
        return this.wheelSize;
    }
    getManufacturer() {
        return this.manufacturer;
    }
}
