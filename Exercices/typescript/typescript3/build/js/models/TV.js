import { Product } from "./Product.js";
export class TV extends Product {
    constructor(model, resolution, size, manufacturer, price) {
        super(model, price, manufacturer);
        this.resolution = resolution;
        this.size = size;
    }
    getResolution() {
        return this.resolution;
    }
    getSize() {
        return this.size;
    }
    getDetails() {
        return `Resolution: ${this.resolution}, Size: ${this.size}"`;
    }
}
