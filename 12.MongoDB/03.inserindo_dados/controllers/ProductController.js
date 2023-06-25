const Product = require('../models/Product')

class ProductController {
    static showProducts(request, response) {
        response.render('products/all')
    }

    static createProduct(request, response) {
        response.render('products/create')
    }

    static createProductPost(request, response) {
        const name = request.body.name                
        const price = request.body.price
        const description = request.body.description
        
        const product = new Product(name, price, description)

        product.save()

        response.redirect('/products')
    }
}

module.exports = ProductController