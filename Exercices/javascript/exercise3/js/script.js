const tela = document.querySelector('canvas');
const pincel = tela.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const width = tela.width = window.innerWidth;
const height = tela.height = window.innerHeight;

let corBase = 'rgb(118, 158, 0)'; 
let formas = [];

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Forma {
  constructor(x, y, velX, velY, color, size, type) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.type = type;
  }

  desenhaFormasTela() {
    pincel.beginPath();
    pincel.fillStyle = this.color;
    switch (this.type) {
      case 'circle':
        pincel.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        break;
      case 'rect':
        pincel.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        break;
      case 'triangle':
        pincel.moveTo(this.x, this.y - this.size);
        pincel.lineTo(this.x + this.size, this.y + this.size);
        pincel.lineTo(this.x - this.size, this.y + this.size);
        pincel.closePath();
        break;
      default:
        break;
    }
    pincel.fill();
  }

  atualizaFormasTela() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  detectaColisao() {
    for (const shape of formas) {
      if (this !== shape) {
        const dx = this.x - shape.x;
        const dy = this.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + shape.size) {
          this.velX = -(this.velX);
          this.velY = -(this.velY);
          shape.velX = -(shape.velX);
          shape.velY = -(shape.velY);
        }
      }
    }
  }
}

// Cria várias formas com propriedades aleatórias
for (let i = 0; i < 25; i++) {
  const size = random(10, 20);
  const type = ['circle', 'rect', 'triangle'][random(0, 2)];
  const shape = new Forma(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    corBase,
    size,
    type
  );
  formas.push(shape);
}

// Evento de mudança de cor
colorPicker.addEventListener('change', (e) => {
  corBase = e.target.value;
  formas.forEach(shape => shape.color = corBase);
});

// Loop de animação
const loop = () => {
  pincel.fillStyle = 'rgb(40,36,59)';
  pincel.fillRect(0, 0, width, height);

  formas.forEach(shape => {
    shape.desenhaFormasTela();
    shape.atualizaFormasTela();
    shape.detectaColisao();
  });

  requestAnimationFrame(loop);
};

loop();
