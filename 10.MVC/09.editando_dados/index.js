const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')
const Task = require('./models/Task')

const taskRoute = require('./routes/taskRoute')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.use('/task', taskRoute)

conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('App rodando na porta 3000 !')
        })
    })
    .catch(error => console.log(error))