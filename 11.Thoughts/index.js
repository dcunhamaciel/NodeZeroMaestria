const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const conn = require('./db/conn')

const Thought = require('./models/Thought')
const User = require('./models/User')

const ThoughtController = require('./controllers/ThoughtController')

const thoughtRoutes = require('./routes/thoughtRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

app.use(flash())

app.use((request, response, next) => {
    if (request.session.userid) {
        response.locals.session = request.session
    }

    next()
})

app.use('/tought', thoughtRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtController.showThoughts)

conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('App rodando na porta 3000 !')
        })
    })
    .catch(error => console.log(error))