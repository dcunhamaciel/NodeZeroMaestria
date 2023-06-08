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

app.get('/user/:id', async (request, response) => {
    const id = request.params.id

    const user = await User.findOne({ raw: true, where: { id: id }})

    response.render('userview', { user })
})

app.post('/user/create', async (request, response) => {
    const name = request.body.name
    const occupation = request.body.occupation
    const newsletter = request.body.newsletter === 'on' ? true : false

    await User.create({ name, occupation, newsletter })

    response.redirect('/')
})

app.get('/user/edit/:id', async (request, response) => {
    const id = request.params.id

    const user = await User.findOne({ raw: true, where: { id: id }})

    response.render('useredit', { user })
})

app.post('/user/edit', async (request, response) => {
    const id = request.body.id
    const name = request.body.name
    const occupation = request.body.occupation
    const newsletter = request.body.newsletter === 'on' ? true : false

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: { id: id }})

    response.redirect('/')
})

app.post('/user/delete/:id', async (request, response) => {
    const id = request.params.id

    await User.destroy({ where: { id: id }})

    response.redirect('/')
})

app.get('/', async (request, response) => {
    const users = await User.findAll({ raw: true })

    response.render('home', { users: users })
})

conn.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('App rodando na porta 3000 !')
        })
    })
    .catch(error => console.log(error))