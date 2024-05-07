import { Request, Response } from "express";
import { registraCompra } from "./compra.service";

function addProdutoCarrinho(req: Request, res: Response){
    const { id } = req.params;
    if (!req.session.carrinhoCompras){
        req.session.carrinhoCompras = [id];
        req.session.carrinhoCompras.push(id);
        res.status(201).json({ msg: "Produto adicionado ao carrinho com sucesso!" });
    }
}

async function finalizarCompra(req: Request, res: Response){
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