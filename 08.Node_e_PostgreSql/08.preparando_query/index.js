const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.get('/books', (request, response) => {
    const query = 'select * from book order by id'

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }

        const books = result.rows

        response.render('books', { books })
    });  
})

app.get('/book/:id', (request, response) => {
    const id = request.params.id

    const query = { 
        text: 'select * from book where id = $1',
        values: [id]
    }

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }

        const book = result.rows[0]

        response.render('book', { book })
    });
})

app.post('/book/insert', (request, response) => {
    const title = request.body.title
    const pages = parseInt(request.body.pages)

    const query = {
        text: 'insert into book (title, pages) values ($1, $2)',
        values: [title, pages]
    }

    pool.query(query, (error) => {
        if (error) { 
            console.log(error)
            return
        }
    })

    response.redirect('/books')
})

app.get('/book/edit/:id', (request, response) => {
    const id = request.params.id 

    const query = {
        text: 'select * from book where id = $1',
        values: [id]
    }

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }

        const book = result.rows[0]

        response.render('editbook', { book })
    });
})

app.post('/book/edit', (request, response) => {
    const id = request.body.id
    const title = request.body.title
    const pages = parseInt(request.body.pages)

    const query = {
        text: 'update book set title = $1, pages = $2 where id = $3',
        values: [title, pages, id]
    }

    pool.query(query, (error) => {
        if (error) { 
            console.log(error)
            return
        }
    })

    response.redirect('/books')
})

app.post('/book/delete/:id', (request, response) => {
    const id = request.params.id

    const query = {
        text: 'delete from book where id = $1',
        values: [id]
    }

    pool.query(query, (error) => {
        if (error) { 
            console.log(error)
            return
        }
    })

    response.redirect('/books')
})

app.get('/', (request, response) => {
    response.render('home')
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000 !')
})