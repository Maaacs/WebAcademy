import { Product } from "./Product.js";

export class TV extends Product {
    private resolution: string;
    private size: number;

    constructor(model: string, resolution: string, size: number, manufacturer: string, price: number) {
        super(model, price, manufacturer);
        this.resolution = resolution;
        this.size = size;
    }

    getResolution(): string {
        return this.resolution;
    }

    getSize(): number {
        return this.size;
    }

    getDetails(): string {
        return `Resolution: ${this.resolution}, Size: ${this.size}"`;
    }
}
