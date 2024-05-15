interface Action {
  type: 'aumentar_qtd' | 'diminuir_qtd' | 'remover' | 'set_items';
  id?: string;
  payload?: Produto[];
}
