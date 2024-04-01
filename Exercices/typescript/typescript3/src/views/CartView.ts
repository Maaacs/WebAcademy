import { CartService } from "../services/CartService.js";
import { TV } from "../models/TV.js";
import { Cellphone } from "../models/Cellphone.js";
import { Bicycle } from "../models/Bicycle.js";
import { IProduct } from "../models/Product.js";


export class CartView {
    private cartService: CartService;

    constructor(cartService: CartService) {
        this.cartService = cartService;
    }

    init(): void {
        //this.updateCartView();
        this.bindAddToCartButtons();
    }

    private bindAddToCartButtons(): void {
        document.querySelectorAll('.btn-adicionar-carrinho').forEach((button) => {
            button.addEventListener('click', (event) => {
                const productType = (event.target as HTMLElement).getAttribute('data-product-type');
                let product;

                switch (productType) {
                    case 'Bicicleta':
                        product = new Bicycle("Bicicleta Modelo Yamaha", 26, "BikeCo", 1000);
                        break;
                    case 'Celular':
                        product = new Cellphone("Celular Motorola", "128GB", "PhoneCo", 500);
                        break;
                    case 'Tv':
                        product = new TV("TV Samsung", "4K", 55, "TV", 1240);
                        break;
                }

                if (product) {
                    this.cartService.addToCart(product);
                    this.updateCartView();
                }
            });
        });
    }

    public updateCartView(): void {
        const productList = this.cartService.getProductList();
        const totalPrice = this.cartService.getTotalPrice();

        const cartProductsListElement = document.getElementById('cartProductsList');
        const cartTotalPriceElement = document.getElementById('cartTotalPrice');

        if (cartProductsListElement && cartTotalPriceElement) {
            cartProductsListElement.textContent = productList.length > 0 ? productList.join(", ") : "Nenhum produto adicionado";
            cartTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
        this.renderizarlistaProdutos();
        this.updateCartCount();
    }

    private renderizarlistaProdutos(): void {
        const listaProdutosElement = document.getElementById("listaProdutos");
        if (!listaProdutosElement) throw new Error("Lista de produtos não encontrada");
    
        const produtos = this.cartService.getCartDetails(); 
        let linhasTabela = '';
    
        produtos.forEach((produto: IProduct) => { 
            linhasTabela += `
                <tr>
                    <td>${produto.getModel()}</td>
                    <td>${produto.getManufacturer()}</td>
                    <td>${produto.getDetails()}</td> <!-- Alterado para getDetails -->
                    <td>${produto.getPrice().toFixed(2)}</td>
                    <td>
                    <button class="btn btn-danger btn-sm ml-2 delete-btn" data-id="${produto.id}">Remover</button>
                    </td>
                </tr>
            `;
        });
        
        listaProdutosElement.innerHTML = `
            <div id="listaProdutos" class="mt-3">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Fabricante</th>
                            <th>Detalhes</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                </table>
                <div class="scrollable-tbody">
                    <table class="table">
                        <tbody>
                            ${linhasTabela}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.addDeleteButtonEventListeners();
    }

    private addDeleteButtonEventListeners(): void {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = (event.target as HTMLElement).getAttribute('data-id');
                if (productId) {
                    this.cartService.removeFromCart(productId);
                    this.updateCartView();
                }
            });
        });
    }
    
    private updateCartCount(): void {
        const productCount = this.cartService.getCartDetails().length;
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = productCount.toString();
        }
    }
}
