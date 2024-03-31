import { IProduct } from "./Product.js";

export class Cart {
    private products: IProduct[] = [];

    addProduct(product: IProduct): void {
        this.products.push(product);
    }

    getTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }

    getProductList(): string[] {
        return this.products.map(product => product.getModel());
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    removeProduct(productId: string): void {
        this.products = this.products.filter(product => product.id !== productId);
    }

}
