const express = require('express')
const exphbs = require('express-handlebars')
const { Client } = require('pg')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (request, response) => {
    response.render('home')
})

const client = new Client({
    host: 'localhost',
    database: 'node',
    user: 'postgres',    
    password: 'masterkey',
    port: 5432,
})

client.connect((error) => {
    if (error) {
        console.log(error)
        process.exit()        
    }

    console.log('Conectado ao PostgreSQL!')

    app.listen(3000, () => {
        console.log('App rodando na porta 3000 !')
    })    
})
