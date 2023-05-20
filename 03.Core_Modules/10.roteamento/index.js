const http = require('http')
const url = require('url')
const fs = require('fs')

const port = 3000

const server = http.createServer((request, response) => {
    const q = url.parse(request.url, true)
    const fileName = q.pathname.substring(1)

    if (fileName.includes('html')) {
        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, function(error, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(data)
            })
        } else {
            fs.readFile('404.html', function(error, data) {
                response.writeHead(404, { 'Content-Type': 'text/html' })
                response.end(data)
            })
        }
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})