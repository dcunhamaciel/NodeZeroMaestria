const Product = require('../models/Product')

class ProductController {
    static showProducts(request, response) {
        response.render('products/all')
    }
}

module.exports = ProductController