import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";
import ItemFavorito from "../ItemFavorito";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

describe("ItemFavorito", () => {
  const setFavoritosMock = jest.fn();
  const produtoMock = mockProdutos[0];

  beforeEach(() => {
    setFavoritosMock.mockClear();
  });

  it("deve renderizar corretamente as informações do produto favorito", () => {
    render(
      <ItemFavorito itemFavorito={produtoMock} setFavoritos={setFavoritosMock} />
    );

    const precoComDesconto = calculaValorComPorcentagemDeDesconto(
      Number(produtoMock.preco),
      produtoMock.desconto
    );

    expect(screen.getByText(produtoMock.nome)).toBeInTheDocument();
    expect(screen.getByText(produtoMock.descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${precoComDesconto.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`${produtoMock.desconto}%`)).toBeInTheDocument();
    expect(screen.getByAltText(produtoMock.fotos[0].titulo)).toBeInTheDocument();
  });

  it("deve chamar a função setFavoritos ao remover um produto dos favoritos", async () => {
    render(
      <ItemFavorito itemFavorito={produtoMock} setFavoritos={setFavoritosMock} />
    );

    const botaoRemover = screen.getByRole("button", {
      name: /Remover/i,
    });

    await userEvent.click(botaoRemover);

    expect(setFavoritosMock).toHaveBeenCalledTimes(1);
  });
});
