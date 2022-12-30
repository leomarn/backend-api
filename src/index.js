import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const products = [];

app.post('/products', (req, res) => {
  const id = uuidv4();
  const { author, title, price } = req.body;
  const item = {
    id,
    author,
    title,
    price,
  };
  products.push(item);
  return res.send(item);
});

app.get('/products', (req, res) => {
  const { id } = req.query;
  const product = id
    ? products.filter((allProducts) => allProducts.id.includes(id))
    : products;
  return res.send(product);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  if (products.some((product) => product.id === id)) {
    const index = products.findIndex((product) => product.id === id);
    const { author, title, price } = req.body;
    const item = {
      id,
      author,
      title,
      price,
    };
    products[index] = item;
    return res.send(products[index]);
  }
  return res.status(400).send('Produto não encontrado!');
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  if (products.some((product) => product.id === id)) {
    const index = products.findIndex((product) => product.id === id);
    products.splice(index, 1);
    return res.send('Produto deletado com sucesso!');
  }
  return res.status(400).send('Produto não encontrado!');
});

app.listen(3000);
