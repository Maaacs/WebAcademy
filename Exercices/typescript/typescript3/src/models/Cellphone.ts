import { Product } from "./Product.js";

export class Cellphone extends Product {
    private manufacturer: string;

    constructor(model: string, private memory: string, manufacturer: string, price: number) {
        super(model, price);
        this.manufacturer = manufacturer;
    }

    getMemory(): string {
        return this.memory;
    }

    getManufacturer(): string {
        return this.manufacturer;
    }
}
