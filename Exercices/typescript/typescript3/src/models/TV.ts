import { Product } from "./Product.js";

export class TV extends Product {
    constructor(model: string, private resolution: string, private size: number, private manufacturer: string, price: number) {
        super(model, price);
    }
}
