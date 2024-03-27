import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import router from './router/router';
//import sass from 'node-sass-middleware';



dotenv.config();

const app = express();
app.use(router);


const PORT = process.env.PORT || 3333;


/*app.engine('handlebars', engine({
  helpers: require(`${__dirname}/views/helpers`),
  layoutsDir: `${__dirname}/views/layouts`
}));*/

app.engine("handlebars", engine(  {
  //helpers: require(`${__dirname}/../src/views/helpers/helpers`),
  layoutsDir: `${__dirname}/../src/views/layouts`,
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

/*
app.use(sass({
  src: `${__dirname}/../public/scss`,
  dest: `${__dirname}/../public/css`,
  outputStyle: "compressed",
  prefix: "/css",
}));


app.use("/css", express.static(`${__dirname}/../public/css`));*/

 


app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
