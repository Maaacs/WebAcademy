import { Request, Response } from "express";
import { registraCompra } from "./compra.service";

function addProdutoCarrinho(req: Request, res: Response){
    /*
        #swagger.summary = "Adiciona um produto ao carrinho"
        #swagger.description = "Adiciona um produto ao carrinho de compras do usuário."
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID do produto a ser adicionado ao carrinho',
            type: 'string'
        }
        #swagger.responses[201] = {
            description: "Produto adicionado ao carrinho com sucesso!"
        }
        #swagger.responses[400] = {
            description: "Erro: Produto não especificado"
        }
    */
    const { id } = req.params;
    if (!req.session.carrinhoCompras){
        req.session.carrinhoCompras = [id];
        req.session.carrinhoCompras.push(id);
        res.status(201).json({ msg: "Produto adicionado ao carrinho com sucesso!" });
    }
}

async function finalizarCompra(req: Request, res: Response){
    /*
        #swagger.summary = "Finaliza a compra"
        #swagger.description = "Finaliza a compra dos produtos adicionados ao carrinho. Requer que o usuário esteja logado e que o carrinho não esteja vazio."
        #swagger.responses[201] = {
            description: "Compra finalizada com sucesso!"
        }
        #swagger.responses[400] = {
            description: "Usuário não logado ou carrinho vazio."
        }
        #swagger.responses[500] = {
            description: "Erro ao finalizar compra."
        }
    */
    if (!req.session.uid)
        return res.status(400).json({ msg: "Usuário não logado." });
    if(!req.session.carrinhoCompras)
        return res.status(400).json({ msg: "Carrinho vazio." });

    try {
        await registraCompra(req.session.carrinhoCompras, req.session.uid);
        res.status(201).json({ msg: "Compra finalizada com sucesso!" });
    }catch(error){
        console.log(error);
        return res.status(500).json({ msg: "Erro ao finalizar compra." });
    }
}


export default { addProdutoCarrinho, finalizarCompra}