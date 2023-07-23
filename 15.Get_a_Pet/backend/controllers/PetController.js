const ObjectId = require('mongoose').Types.ObjectId

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

const Pet = require('../models/Pet')

class PetController {
    static async getAll(request, response) {
        const pets = await Pet.find().sort('-createdAt')

        response.status(200).json({ pets })
    }

    static async getPetById(request, response) {
        const id = request.params.id

        if (!ObjectId.isValid(id)) {
            response.status(422).json({ message: 'Id inválido!' })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            response.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        response.status(200).json({ pet })
    }    

    static async getAllUserPets(request, response) {
        const token = await getToken(request)
        const user = await getUserByToken(token)
        
        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        response.status(200).json({ pets })
    }

    static async getAllUserAdoptions(request, response) {
        const token = await getToken(request)
        const user = await getUserByToken(token)
        
        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        response.status(200).json({ pets })        
    }

    static async create(request, response) {
        const { name, age, weight, color } = request.body

        const images = request.files

        const available = true

        if (!name) {
            response.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!age) {
            response.status(422).json({ message: 'A idade é obrigatória!' })
            return
        }

        if (!weight) {
            response.status(422).json({ message: 'O peso é obrigatório!' })
            return
        }

        if (!color) {
            response.status(422).json({ message: 'A cor é obrigatória!' })
            return
        }

        if (!images || images.length == 0) {
            response.status(422).json({ message: 'A imagem é obrigatória!' })
            return
        }

        const token = await getToken(request)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            
            response.status(201).json({ message: 'Pet cadastrado com sucesso', pet: newPet })
        } catch(error) {
            response.status(500).json({ message: error })
        }

        response.json({ message: 'chegou no pet!' })
    }

    static async removePetById(request, response) {
        const id = request.params.id

        if (!ObjectId.isValid(id)) {
            response.status(422).json({ message: 'Id inválido!' })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            response.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        const token = await getToken(request)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            response.status(404).json({ message: 'Pet não pertencente ao usuário!' })
            return
        }

        await Pet.findByIdAndRemove(id)

        response.status(200).json({ message: 'Pet removido com sucesso!' })
    }    
}

module.exports = PetController