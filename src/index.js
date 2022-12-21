import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const app = express();
app.use(express.json());

const products = [];

app.post('/products', (req, res) => {
    const id = uuidv4();
    const { author, title, price } = req.body
    const item = {
        id,
        author,
        title,
        price
    };
    products.push(item);
    return res.send(item);
});

app.get('/products', (req,res) => {
    return res.send(products);
})

app.put('/products/:id', (req, res) => {
    if(products.some(product => product.id === req.params.id)){
        const index = products.findIndex( product => product.id === req.params.id )
        const { author, title, price } = req.body
        const item = {
            id: req.params.id,
            author,
            title,
            price
        };
        products[index] = item;
        return res.send(products[index]);    
    } else {
        return res.send('Produto não encontrado!');  
    }
});

app.delete('/products/:id', (req, res) => {
    if(products.some(product => product.id === req.params.id)){
        const index = products.findIndex( product => product.id === req.params.id )
        products.splice(index, 1)
        return res.send('Produto deletado com sucesso!');    
    } else {
        return res.send('Produto não encontrado!');  
    }
});

app.listen(3000, () => {
    return console.log('Server started!')
})