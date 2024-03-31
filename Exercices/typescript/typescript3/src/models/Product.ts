export interface IProduct {
    id: string;
    getModel(): string;
    getPrice(): number;
    getManufacturer(): string;
    getDetails(): string;
}

export abstract class Product implements IProduct {
    public readonly id: string;

    constructor(protected model: string, protected price: number, protected manufacturer: string) {
        this.id = Math.random().toString(36).substr(2, 9);
    }

    getModel(): string {
        return this.model;
    }

    getPrice(): number {
        return this.price;
    }

    getManufacturer(): string {
        return this.manufacturer;
    }

    abstract getDetails(): string;
}
