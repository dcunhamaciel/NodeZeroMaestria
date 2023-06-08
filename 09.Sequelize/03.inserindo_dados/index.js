const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')
const User = require('./models/User')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.get('/user/create', (request, response) => {
    response.render('adduser')
})

app.post('/user/create', async (request, response) => {
    const name = request.body.name
    const occupation = request.body.occupation
    const newsletter = request.body.newsletter === 'on' ? true : false

    await User.create({ name, occupation, newsletter })

    response.redirect('/')
})

app.get('/', (request, response) => {
    response.render('home')
})

conn.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('App rodando na porta 3000 !')
        })
    })
    .catch(error => console.log(error))