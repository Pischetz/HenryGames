import axios from 'axios';
require('dotenv').config();


// const {process.env.BACKHOST} = process.env


export function getGames(name){
    if(name){
        return function(dispatch){
            return axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(r => r.data)
            .then(json => {
                dispatch({type: 'GET_GAMES_BY_NAME', payload: json})
            })
        }
    }else{
        return function(dispatch){
            return axios.get(`http://localhost:3001/videogames`)
            .then(r => r.data)
            .then(json => {
                dispatch({type: 'GET_GAMES', payload: json})
            })
        }
    }
}

export function getGenres(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/genres`)
        .then(r => r.data)
        .then(json => {
            dispatch({type: 'GET_GENRES', payload: json})
        })
    }
}

export function postGames(game){
    return function(dispatch){
        return axios.post(`http://localhost:3001/videogames`, {...game})
        .then(r => r.data)
        .then(json => {
            dispatch({type: 'POST_GAME', payload: json})
        })
    }
}

export function getGameDetails(id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames/${id}`)
        .then(r => r.data)
        .then(json => {
            dispatch({type: 'GET_GAME_DETAILS', payload: json})
        })
    }
}

export function clearGameDetails(){
    return function(dispatch){
        dispatch({type: 'CLEAR_GAME_DETAILS', payload: {}})
    }
}

export function clearGamesByName(){
    return function(dispatch){
        dispatch({type: 'CLEAR_GAMES_BY_NAME', payload: []})
    }
}

export function setCreatedBy(by){
    return function(dispatch){
        dispatch({type: 'FILTER_CREATED_BY', payload: by})
    }
}

export function setAlfabeticalOrder(order){
    return function(dispatch){
        dispatch({type: 'FILTER_ALFABETICAL_ORDER', payload: order})
    }
}

export function setRatingOrder(order){
    return function(dispatch){
        dispatch({type: 'FILTER_RATING_ORDER', payload: order})
    }
}

export function setGenres(genres){
    return function(dispatch){
        dispatch({type: 'FILTER_BY_GENRE', payload: genres})
    }
}

export function clearAllGames(){
    return function(dispatch){
        dispatch({type: 'CLEAR_ALL_GAMES', payload: []})
    }
}