const express = require('express')
const exphbs = require('express-handlebars')
const { Client } = require('pg')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

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

app.get('/books', (request, response) => {
    const query = 'select * from book'

    client.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }

        const books = result.rows

        response.render('books', { books })
    });  
})

app.post('/book/insert', (request, response) => {
    const title = request.body.title
    const pages = parseInt(request.body.pages)

    const query = `insert into book (title, pages) values ('${title}', ${pages})`

    client.query(query, (error) => {
        if (error) { 
            console.log(error)
            return
        }
    })

    response.render('books')
})

app.get('/', (request, response) => {
    response.render('home')
})