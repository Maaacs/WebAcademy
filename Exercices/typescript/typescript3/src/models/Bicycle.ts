import { Product } from "./Product.js";

export class Bicycle extends Product {
    private wheelSize: number;

    constructor(model: string, wheelSize: number, manufacturer: string, price: number) {
        super(model, price, manufacturer);
        this.wheelSize = wheelSize;
    }

    getWheelSize(): number {
        return this.wheelSize;
    }

    getDetails(): string {
        return `Tamanho do aro: ${this.wheelSize}"`;
    }
}
