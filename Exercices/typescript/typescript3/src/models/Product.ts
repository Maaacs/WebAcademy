export interface IProduct {
    getModel(): string;
    getPrice(): number;
}

export abstract class Product implements IProduct {
    constructor(protected model: string, protected price: number) {}

    getModel(): string {
        return this.model;
    }

    getPrice(): number {
        return this.price;
    }
}
