const http = require('http')
const fs = require('fs')

const port = 3000

const server = http.createServer((request, response) => {
    const urlInfo = require('url').parse(request.url, true)
    const name = urlInfo.query.name

    if (!name) {
        fs.readFile('index.html', function(error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(data)
        })
    } else {
        fs.writeFile('arquivo.txt', name, function(error, data) {
            response.writeHead(302, {
                Location: '/'
            })
            response.end()
        })        
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})