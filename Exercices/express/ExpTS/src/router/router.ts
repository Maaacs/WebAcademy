import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();
const lorem = new LoremIpsum();

router.get('/', (req, res) => {
  res.send('Página principal do site');
});

router.get('/sobre', (req, res) => {
  res.send('Página sobre');
});


router.get('/lorem/:num', (req, res) => {
  const num = parseInt(req.params.num, 10);
  let paragraphs = '';

  for (let i = 0; i < num; i++) {
    const numberOfSentences = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    paragraphs += `<p>${lorem.generateSentences(numberOfSentences)}</p>`;
  }

  res.send(paragraphs);
});

export default router;
