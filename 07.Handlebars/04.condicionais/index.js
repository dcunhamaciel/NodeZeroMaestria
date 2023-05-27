const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (request, response) => {
    response.render('dashboard')
})

app.get('/', (request, response) => {
    const user = {
        name: "Diego",
        surname: "Maciel",
        age: 38
    }

    const auth = true

    response.render('home', { user: user, auth })
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000!')
})