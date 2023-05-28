const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/dashboard', (request, response) => {
    const items = ["Item a", "Item b", "item c"]

    response.render('dashboard', { items })
})

app.get('/post', (request, response) => {
    const post = {
        title: "Aprender Node.js",
        category: "JavaScript",
        body: "Este artigo vai te ajudar a aprender Node.js",
        comments: 4
    }

    response.render('blogpost', { post })
})

app.get('/blog', (request, response) => {
    const posts = [
        {
            title: "Aprender Node.js",
            category: "JavaScript",
            body: "Teste",
            comments: 4
        }, {
            title: "Aprender PHP",
            category: "PHP",
            body: "Teste",
            comments: 6
        }, {
            title: "Aprender Python",
            category: "Python",
            body: "Teste",
            comments: 3
        }]

    response.render('blog', { posts })
})

app.get('/', (request, response) => {
    const user = {
        name: "Diego",
        surname: "Maciel",
        age: 38
    }

    const auth = true

    const approved = false

    response.render('home', { user: user, auth, approved })
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000!')
})