const http = require('http')

const port = 3000

const server = http.createServer((request, response) => {
    response.write('Oi HTTP')
    response.end()
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})