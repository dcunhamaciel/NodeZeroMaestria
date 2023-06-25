const Product = require('../models/Product')

class ProductController {
    static async showProducts(request, response) {
        const products = await Product.getProducts()

        response.render('products/all', { products })
    }

    static async getProduct(request, response) {
        const id = request.params.id

        const product = await Product.getProductById(id)

        response.render('products/product', { product })
    }

    static createProduct(request, response) {
        response.render('products/create')
    }

    static createProductPost(request, response) {
        const name = request.body.name                
        const price = request.body.price
        const description = request.body.description
        const image = request.body.image
        
        const product = new Product(name, price, description, image)

        product.save()

        response.redirect('/products')
    }

    static async deleteProduct(request, response) {
        const id = request.params.id

        await Product.delete(id)

        response.redirect('/products')
    }
}

module.exports = ProductController