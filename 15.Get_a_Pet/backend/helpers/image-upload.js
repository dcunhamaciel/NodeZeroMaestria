const multer = require('multer')
const path = require('path')

const imageStore = multer.diskStorage({
    destination: function (request, file, callback) {
        let folder = ''

        if (request.baseUrl.includes('users')) {
            folder = 'users'
        } else if (request.baseUrl.includes('pets')) {
            folder = 'pets'
        }

        callback(null, `public/images/${folder}`)
    },
    filename: function (request, file, callback) {
        callback(null, Date.now() + String(Math.floor(Math.random() * 10)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(request, file, callback) {        
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return callback(new Error('Envie apenas imagens png ou jpg!'))
        }

        callback(undefined, true)
    }
})

module.exports = imageUpload