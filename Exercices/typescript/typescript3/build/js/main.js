import { TV } from "./models/TV.js";
import { Cellphone } from "./models/Cellphone.js";
import { Bicycle } from "./models/Bicycle.js";
import { CartService } from "./services/CartService.js";
import { CartView } from "./views/CartView.js";
const cartService = new CartService();
const cartView = new CartView(cartService);
function confirmarCadastroBicicleta() {
    let modelo, fabricante, preco;
    let aro;
    let produto;
    modelo = document.getElementById('modeloBicicleta').value;
    fabricante = document.getElementById('fabricanteBicicleta').value;
    preco = parseFloat(document.getElementById('precoBicicleta').value);
    aro = parseInt(document.getElementById('aroBicicleta').value);
    if (!modelo || isNaN(aro) || !fabricante || isNaN(preco)) {
        alert('Preencha todos os campos da bicicleta!');
        return;
    }
    produto = new Bicycle(modelo, aro, fabricante, preco);
    cartService.addToCart(produto);
    cartView.updateCartView();
    const modalElement = document.getElementById('novoProdutoModalBicicleta');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    }
}
function confirmarCadastroCelular() {
    let modelo, fabricante, preco;
    let memoria;
    let produto;
    modelo = document.getElementById('modeloCelular').value;
    fabricante = document.getElementById('fabricanteCelular').value;
    preco = parseFloat(document.getElementById('precoCelular').value);
    memoria = document.getElementById('memoriaCelular').value;
    if (!modelo || !memoria || !fabricante || isNaN(preco)) {
        alert('Preencha todos os campos do celular!');
        return;
    }
    produto = new Cellphone(modelo, memoria, fabricante, preco);
    cartService.addToCart(produto);
    cartView.updateCartView();
    const modalElement = document.getElementById('novoProdutoModalCelular');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    }
}
function confirmarCadastroTv() {
    let modelo, fabricante, preco;
    let resolucao, tamanho;
    let produto;
    modelo = document.getElementById('modeloTv').value;
    fabricante = document.getElementById('fabricanteTv').value;
    preco = parseFloat(document.getElementById('precoTv').value);
    resolucao = document.getElementById('resolucaoTv').value;
    tamanho = parseInt(document.getElementById('tamanhoTv').value);
    if (!modelo || !resolucao || isNaN(tamanho) || !fabricante || isNaN(preco)) {
        alert('Preencha todos os campos da TV!');
        return;
    }
    produto = new TV(modelo, resolucao, tamanho, fabricante, preco);
    cartService.addToCart(produto);
    cartView.updateCartView();
    const modalElement = document.getElementById('novoProdutoModalTv');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    }
}
function abrirModalBicicleta() {
    preencherFormularioBicicleta();
    const modalElement = document.getElementById('novoProdutoModalBicicleta');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
    }
}
function abrirModalCelular() {
    preencherFormularioCelular();
    const modalElement = document.getElementById('novoProdutoModalCelular');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
    }
}
function abrirModalTv() {
    preencherFormularioTv();
    const modalElement = document.getElementById('novoProdutoModalTv');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
    }
}
function preencherFormularioBicicleta() {
    const form = document.getElementById('novoProdutoBicicletaForm');
    if (form) {
        form.innerHTML = `
        <div class="mb-3">
            <label for="modeloBicicleta" class="form-label">Modelo da Bicicleta</label>
            <input type="text" class="form-control" id="modeloBicicleta" required>
        </div>
        <div class="mb-3">
            <label for="aroBicicleta" class="form-label">Tamanho do Aro</label>
            <input type="number" class="form-control" id="aroBicicleta" required>
        </div>
        <div class="mb-3">
            <label for="fabricanteBicicleta" class="form-label">Fabricante</label>
            <input type="text" class="form-control" id="fabricanteBicicleta" required>
        </div>
        <div class="mb-3">
            <label for="precoBicicleta" class="form-label">Valor</label>
            <input type="number" class="form-control" id="precoBicicleta" required>
        </div>
        `;
    }
}
function preencherFormularioCelular() {
    const form = document.getElementById('novoProdutoCelularForm');
    if (form) {
        form.innerHTML = `
            <div class="mb-3">
            <label for="modeloCelular" class="form-label">Modelo do Celular</label>
            <input type="text" class="form-control" id="modeloCelular" required>
            </div>
            <div class="mb-3">
                <label for="memoriaCelular" class="form-label">Memória</label>
                <input type="text" class="form-control" id="memoriaCelular" required>
            </div>
            <div class="mb-3">
                <label for="fabricanteCelular" class="form-label">Fabricante</label>
                <input type="text" class="form-control" id="fabricanteCelular" required>
            </div>
            <div class="mb-3">
                <label for="precoCelular" class="form-label">Valor</label>
                <input type="number" class="form-control" id="precoCelular" required>
            </div>
        `;
    }
}
function preencherFormularioTv() {
    const cartService = new CartService();
    const cartView = new CartView(cartService);
    cartView.init();
    const form = document.getElementById('novoProdutoTvForm');
    if (form) {
        form.innerHTML = `
            <div class="mb-3">
            <label for="modeloTv" class="form-label">Modelo da TV</label>
            <input type="text" class="form-control" id="modeloTv" required>
            </div>
            <div class="mb-3">
                <label for="resolucaoTv" class="form-label">Resolução</label>
                <input type="text" class="form-control" id="resolucaoTv" required>
            </div>
            <div class="mb-3">
                <label for="tamanhoTv" class="form-label">Tamanho em Polegadas</label>
                <input type="number" class="form-control" id="tamanhoTv" required>
            </div>
            <div class="mb-3">
                <label for="fabricanteTv" class="form-label">Fabricante</label>
                <input type="text" class="form-control" id="fabricanteTv" required>
            </div>
            <div class="mb-3">
                <label for="precoTv" class="form-label">Valor</label>
                <input type="number" class="form-control" id="precoTv" required>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    cartView.init();
    const botaoCadastroBicicleta = document.querySelector('button[data-target="#novoProdutoModalBicicleta"]');
    if (botaoCadastroBicicleta) {
        botaoCadastroBicicleta.addEventListener('click', abrirModalBicicleta);
    }
    else {
        console.error('Botão de cadastro de bicicleta não encontrado');
    }
    const botaoCadastroCelular = document.querySelector('button[data-target="#novoProdutoModalCelular"]');
    if (botaoCadastroCelular) {
        botaoCadastroCelular.addEventListener('click', abrirModalCelular);
    }
    else {
        console.error('Botão de cadastro de celular não encontrado');
    }
    const botaoCadastroTv = document.querySelector('button[data-target="#novoProdutoModalTv"]');
    if (botaoCadastroTv) {
        botaoCadastroTv.addEventListener('click', abrirModalTv);
    }
    else {
        console.error('Botão de cadastro de TV não encontrado');
    }
});
window.confirmarCadastroBicicleta = confirmarCadastroBicicleta;
window.confirmarCadastroCelular = confirmarCadastroCelular;
window.confirmarCadastroTv = confirmarCadastroTv;
