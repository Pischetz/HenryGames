require('dotenv').config();
const axios = require('axios')
const {Router} = require('express')
const {Videogame , Genre} = require('../db')
const { Op } = require('sequelize')
const Promise = require('bluebird')

const {key} = process.env

const videogamesRouter = Router()


videogamesRouter.post('/', async (req,res) =>{
    try{
        const {name, description, released, rating, platforms, genres } = req.body
        let videogame = await Videogame.create({
            name: name,
            description: description,
            released: released,
            rating: rating,
            platforms: platforms,
          })
        await videogame.addGenres(genres)
        res.json(videogame)
    }catch(err){
        res.json(err)
    }
})

videogamesRouter.get('/', async(req,res)=>{
    try{
        //LA API NOS TRAE SOLO 20 JUEGOS POR PAGE
        //GUARDO EN UN ARRAY LOS 5 FETCHS QUE NECESITARIA
        let urls = [
            `https://api.rawg.io/api/games?key=${key}`,
            `https://api.rawg.io/api/games?key=${key}&page=2`,
            `https://api.rawg.io/api/games?key=${key}&page=3`,
            `https://api.rawg.io/api/games?key=${key}&page=4`,
            `https://api.rawg.io/api/games?key=${key}&page=5`,
        ]
        let aux = []
        //PRIMERO NOS ASEGURAMOS SI HAY O NO QUERY
        if (req.query.name) {
            //SI HAY QUERY BUCAMOS PRIMERO EN LA BASE DE DATOS
            let dbResponse = await Videogame.findAll({
                where: {
                    name: {
                        //USAR OPERADOR PARA QUE BUSQUE SIN PROBLEMAS DE MAYUSCULAS
                        [Op.iLike]: `%${req.query.name}%` 
                    }
                },
                //PASAMOS UNICAMENTE LO QUE NECEISTA EL FRONT
                attributes: ["name", "Id", "rating"],
                include: Genre
            })
            //DEBEMOS PASAR 15 JUEGOS, ASI QUE ENVIAMOS HASTA QUE SE ACABEN LOS
            //DE LA DB O HASTA LLENAR LOS 15
            while(aux.length < 15 && dbResponse.length > 0){
                aux.push(dbResponse.pop())
            }
            //SI SE ACABARON LOS DE LA DB PASAMOS DESDE LA API
            //EN CASO DE QUE YA ESTÉN COMPLETOS LOS 15 NO PERDEMOS TIEMPO
            //CON UN PEDIDO A LA API
            if(aux.length < 15){
                let axiosResponse = await axios.get(`https://api.rawg.io/api/games?key=${key}&search=${req.query.name}`)
                axiosResponse.data.results.map(result =>{
                    if(aux.length < 15){
                        result ={
                            Id: result.id,
                            image: result.background_image,
                            name: result.name,
                            Genres: result.genres,
                            rating: result.rating
                        }
                        aux.push(result)
                    }  
                })
            }
            //
            if(!aux.length){
                res.json([{msg: 'No Games Found'}])
            }else{
                res.json(aux)
            }
        }
        else{
            //EN EL CASO DE QUE NO HAYA QUERY TRAEMOS TODOS LOS JUEGOS DE LA DB
            //Y LOS PRIMEROS 100 JUEGOS DE LA API
            let dbResponse = await Videogame.findAll({
                //ENVIAMOS SOLO LOS DATOS QUE NECESITA EL FRONT
                attributes: ["name", "Id", "rating"],
                include: Genre
            });
            //YA QUE NECESITO HACER 5 LLAMADOS LOS HACEMOS EN PARALELO CON EL PROMISE.ALL
            //AHORRAR TIEMPO.
            let axiosResponses = await Promise.all(urls.map(url => axios.get(url)))
            axiosResponses = axiosResponses.map(response => {
                response.data.results.map(result =>{
                    //ENVIAMOS SOLO LOS DATOS QUE NECESITA EL FRONT
                    result = {
                        Id: result.id,
                        image: result.background_image,
                        name: result.name,
                        Genres: result.genres,
                        rating: result.rating
                    }
                    aux.push(result)
                })
            })
            aux = [...dbResponse, ...aux]
            res.json(aux)
        }
    }catch(err){
        //CONTROL DE PLAGAS
        res.send(err)
    }
})

videogamesRouter.get('/:gameId', async(req,res) => {
    try{
        const {gameId} = req.params
        //EL ID DE LA API SON INTEGERS, EL DE LA DB SON UUIDV4
        //SI EXISTE UN GUION EN EL ID DEBE SER DE LA DB
        if (gameId.includes('-')){
            let videogame = await Videogame.findByPk(gameId, {
                include: Genre
            })
            res.json(videogame)
        }else{
            let response = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${key}`)
            //DESTRUCTURING POR PURA COMODIDAD Y LEGIBILIDAD
            let {id, name, genres, background_image, description, rating, released, platforms } = response.data
            let sendingPlatforms = []
            platforms.map(platform => sendingPlatforms.push(platform.platform.name))
            res.json({
                Id: id,
                name: name,
                image: background_image,
                description: description,
                rating: rating,
                released: released,
                platforms: sendingPlatforms,
                Genres: genres
            })
        }
    }catch(err){
        res.status(err.status || 500).send(err)
    }

})


module.exports = videogamesRouter