const express = require('express');
const methodOverride = require('method-override')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product')

//Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/productsApp')
    .then(() => {
        console.log('CONNECTED TO MONGODB!')
    })
    .catch(err => {
        console.log(`CONNECTION ERROR: ${err}`)
    })

//Set EJS path and view engine, Middleware

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//Homepage Route

app.get('/', (req,res) => {
    res.send('Homepage')
})

//View all products page

app.get('/products', async (req,res) => {
 const {category} = req.query
 if (category)   {
    const products = await Product.find({category})
    res.render('products/index', {products, category})
 } else {
    const products = await Product.find({})
    res.render('products/index', {products, category: 'ALL'})
 }
})

const categories = ['fruit','vegetable','dairy']

//Form for adding a new product

app.get('/products/new', (req,res) => {
    res.render('products/new', {categories})
   })


//Add new product to Database

app.post('/products', async (req,res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
   })


//View product details page

app.get('/products/:id', async (req,res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/details', {product})
   })

//Edit product information

app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
   })

// Update product

app.put('/products/:id', async (req,res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
   })

// Delete product

app.delete('/products/:id', async (req,res) => {
    const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
   })

app.listen('3000', () => {
    console.log('LISTENING ON PORT 3000...')
})