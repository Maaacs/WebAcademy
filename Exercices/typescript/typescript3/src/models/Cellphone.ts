import { Product } from "./Product.js";

export class Cellphone extends Product {
    private memory: string;

    constructor(model: string, memory: string, manufacturer: string, price: number) {
        super(model, price, manufacturer);
        this.memory = memory;
    }

    getMemory(): string {
        return this.memory;
    }

    getDetails(): string {
        return `Memory: ${this.memory}`;
    }
}
