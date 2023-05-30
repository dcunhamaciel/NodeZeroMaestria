const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const products = [
    {
        id: 1,
        description: 'Mouse',
        price: 45.20
    }, {
        id: 2,
        description: 'Teclado',
        price: 92.50
    }, {
        id: 3,
        description: 'Monitor',
        price: 520.99
    }
]

app.get('/', (request, response) => {
    response.render('home', { products })
})

app.get('/product/:id', (request, response) => {
    const product = products[parseInt(request.params.id) - 1]

    console.log(product);

    response.render('product', { product })
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000!')
})