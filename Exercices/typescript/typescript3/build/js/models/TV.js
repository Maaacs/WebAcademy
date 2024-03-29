import { Product } from "./Product.js";
export class TV extends Product {
    constructor(model, resolution, size, manufacturer, price) {
        super(model, price);
        this.resolution = resolution;
        this.size = size;
        this.manufacturer = manufacturer;
    }
}
