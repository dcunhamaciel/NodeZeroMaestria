const Product = require('../models/Product')

class ProductController {
    static async showProducts(request, response) {
        const products = await Product.find().lean()

        response.render('products/all', { products })
    }

    static async getProduct(request, response) {
        const id = request.params.id

        const product = await Product.findById(id).lean()

        response.render('products/product', { product })
    }

    static createProduct(request, response) {
        response.render('products/create')
    }

    static async createProductPost(request, response) {
        const name = request.body.name                
        const price = request.body.price
        const description = request.body.description
        const image = request.body.image
        
        const product = new Product({ name, price, description, image })

        await product.save()

        response.redirect('/products')
    }

    static async editProduct(request, response) {
        const id = request.params.id

        const product = await Product.findById(id).lean()

        response.render('products/edit', { product })
    }

    static async editProductPost(request, response) {
        const id = request.body.id
        const name = request.body.name              
        const price = request.body.price
        const description = request.body.description
        const image = request.body.image

        const product = { name, price, description, image }
        
        await Product.updateOne({ _id: id }, product)

        response.redirect('/products')
    }

    /*static async deleteProduct(request, response) {
        const id = request.params.id

        await Product.delete(id)

        response.redirect('/products')
    }*/
}

module.exports = ProductController