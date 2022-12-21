const express = require('express');
const app = express();
app.use(express.json());

const products = [];

app.post('/products', (req, res) => {
    products.push(req.body);
    return res.send('Produto Cadastrado!');
});

app.get('/products', (req,res) => {
    return res.send(products);
})

app.put('/products/:id', (req, res) => {
    products[req.params.id] = req.body
    return res.send('Produto Atualizado');
});

app.delete('/products/:id', (req, res) => {
    products.splice(req.params.id,1);
    return res.send('Produto Deletado');
});

app.listen(3000, () => {
    return console.log('Server started!')
})