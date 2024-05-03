import { CardProduto } from "./CardProduto";

export function ListagemProdutos (){
    const nomeProduto = "Notebook 1";
    return( 
        <div>
            <h5 className="mb-3">Produtos disponíveis:</h5>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                <CardProduto />
                <CardProduto />
                <CardProduto />
                <CardProduto />
            </div>
        </div>
    );
}