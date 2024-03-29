import { Product } from "./Product.js";

export class Bicycle extends Product {
    private manufacturer: string;

    constructor(model: string, private wheelSize: number, manufacturer: string, price: number) {
        super(model, price);
        this.manufacturer = manufacturer;
    }

    getWheelSize(): number {
        return this.wheelSize;
    }

    getManufacturer(): string {
        return this.manufacturer;
    }
}
