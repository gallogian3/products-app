const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product')


mongoose.connect('mongodb://127.0.0.1:27017/productsApp')
    .then(() => {
        console.log('CONNECTED TO MONGODB!')
    })
    .catch(err => {
        console.log(`CONNECTION ERROR: ${err}`)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', (req,res) => {
    res.send('Homepage')
})


app.listen('3000', () => {
    console.log('LISTENING ON PORT 3000...')
})