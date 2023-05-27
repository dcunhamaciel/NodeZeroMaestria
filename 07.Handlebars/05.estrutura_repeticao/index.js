const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (request, response) => {
    const items = ["Item a", "Item b", "item c"]

    response.render('dashboard', { items })
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