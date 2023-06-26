const { Timestamp } = require('mongodb')
const conn = require('../db/conn')

const { ObjectId } = require('mongodb')

class Product {
    constructor(name, price, description, image) {
        this.name = name
        this.price = price
        this.description = description
        this.image = image
    }

    static getProducts() {
        const products = conn.db().collection('products').find().toArray()

        return products
    }
    
    static async getProductById(id) {
        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) })

        return product
    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            price: this.price,
            description: this.description,
            image:  this.image
        })

        return product
    }

    update(id) {
        const product = conn.db().collection('products').updateOne({ _id: new ObjectId(id) }, { $set: this })

        return product
    }

    static delete(id) {
        conn.db().collection('products').deleteOne({ _id: new ObjectId(id) })

        return
    }
}

module.exports = Product