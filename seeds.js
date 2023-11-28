const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/productsApp')
    .then(() => {
        console.log('CONNECTED TO MONGODB!')
    })
    .catch(err => {
        console.log(`CONNECTION ERROR: ${err}`)
    })

const firstProduct = new Product({
    name: 'Orange',
    price: 1.99,
    category: 'fruit'
})

firstProduct.save().then(p => {
    console.log(firstProduct)
})
.catch(e => {
    console.log(`Error adding product: ${e}!`)
})

const seedProducts = [
    {
        name: 'Carrot',
        price: '0.80',
        category: 'vegetable'
    },
    {
        name: 'Tomato',
        price: 1.00,
        category: 'vegetable',
    },
    {
        name: 'Apple',
        price: 0.90,
        category: 'fruit',
    },
    {
        name: 'Cheddar',
        price: 1.20,
        category: 'dairy',
    }
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(`Error adding products: ${e}!`)
})