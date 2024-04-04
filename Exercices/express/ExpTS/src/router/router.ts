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


router.get('/hb1', (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
     layout: false,
    });
});

router.get('/hb2', (req, res) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
});


router.get('/hb3', (req, res) => {
    const profes = [ 
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, layout: false });
});


router.get('/hb4', (req, res) => {
    const technologies = [
      { name: 'Express', type: 'Framework', poweredByNodejs: true },
      { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
      { name: 'React', type: 'Library', poweredByNodejs: true },
      { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
      { name: 'Django', type: 'Framework', poweredByNodejs: false },
      { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
      { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
  
    res.render('main/hb4', { technologies });
});
  


export default router;
