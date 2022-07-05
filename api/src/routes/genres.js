require('dotenv').config();
const {Router} = require('express')
const { Genre } = require('../db')
const axios = require('axios')
const Promise = require('bluebird')

const {key} = process.env

const genresRouter = Router()


//FUNCIÓN ASINCRONA DE CREACIÓN DE GENRE
async function addToGenre(id, name){
    await Genre.create({
        Id: id,
        name: name
    })
}


// MIDDLEWARE PARA CHECK DE QUE SE ENCUENTREN LOS GENRES EN LA BASE DE DATOS
// O EN SU DEFECTO AGREGARLOS

async function checkDB(req,res,next){
    try{
        Genre.findAll().then(async genres => {
            if (!genres.length){
                let response = await axios.get(`https://api.rawg.io/api/genres?key=${key}`)
                await Promise.all(response.data.results.map(genre => addToGenre(genre.id, genre.name)))
                res.redirect('/genres')
            }else {
                req.genres = genres
                next()
            }
        })
    }catch(err){
        res.json(err)
    }
    
}

//RUTA
genresRouter.get('/', checkDB, (req,res) => {
    res.json(req.genres)
})

module.exports = genresRouter