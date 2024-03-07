const displayedImage = document.querySelector('.first-image');
const thumbBar = document.querySelector('.cards');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const images = ['img_battle.png', 'img_extra.png', 'img_leader.png', 'img_unison.png', 'img_z-battle.png'];
const alts = {
    'img_battle.png': 'Dragon Ball battle card Vegeta combat scene',
    'img_extra.png': 'Dragon Ball extra card Z fighters',
    'img_leader.png': 'Dragon Ball leader card Goku Ssj God',
    'img_unison.png': 'Dragon Ball unison card Gogeta',
    'img_z-battle.png': 'Dragon Ball Z battle card Goku Ssj4'
};
  

images.forEach(image => {
  const newImage = document.createElement('img');
  newImage.src = `assets/img/${image}`;
  newImage.alt = alts[image];
  thumbBar.appendChild(newImage);
  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
});

btn.addEventListener('click', () => {
  const mode = btn.classList.contains('light-mode') ? 'dark' : 'light';
  btn.textContent = mode === 'light' ? 'Super Saiyajin' : 'Saiyajin';
  overlay.style.animation = mode === 'light' ? 'none' : 'kiCharge 1s infinite alternate';
  overlay.style.backgroundColor = mode === 'light' ? 'rgba(0,0,0,0)' : 'rgba(255,215,0,0.5)';
  btn.classList.toggle('light-mode');
});
