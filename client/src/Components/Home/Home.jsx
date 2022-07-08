import { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {clearGamesByName, getGames} from '../../Actions/Actions'
import BotonesPaginado from '../BotonesPaginado/BotonesPaginado';
import Cards from '../Cards/Cards';
import Filtrado from '../Filtrados/Filtrados';
import Spinner from '../Spinner/Spinner';
import './Home.css'
let timer

function Home(props){
    const [gamesToShow, setGames] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState('')
    const [error, setError] = useState(false)
    

    let {games, getGames, gamesByName, clearGamesByName, alfabeticalOrder, ratingOrder, createdBy, genresFilter} = props

    useEffect(() => {
        if(!games.length){
            getGames()  
        }
    }, [games, getGames])

    useEffect(() => {
        //FUNCION PARA BUSCADOR DINAMICO
        function compare(toSearch){
            clearTimeout(timer)
            timer = setTimeout(() => {
                getGames(toSearch)
            }, 1000)
        }
        if(!search.length){
            //SI NO HAY BUSQUEDA
            setSearching('')
            setError(false)
            //LIMPIAMOS SI EXISTIERAN JUEGOS DE LA ULTIMA BUSQUEDA
            if (gamesByName.length){
                clearGamesByName()
            }
            //SI HAY JUEGO FILTRAMOS, PAGINAMOS Y MOSTRAMOS
            if(games.length){
                let aux = [...games]
                //FILTRADO POR CREACION
                if(createdBy !== 'all'){
                    if(createdBy === 'created'){
                        aux = aux.filter(game => game.Id.toString().includes('-') === true)
                    }else{
                        aux = aux.filter(game => game.Id.toString().includes('-') === false)
                    }
                }
                //FILTRADO POR ORDEN ALFABETICO
                if(alfabeticalOrder !== 'none'){
                    if(alfabeticalOrder === 'a-z'){
                        aux = aux.sort((a,b) => {if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                          }
                          if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                          }
                          // a must be equal to b
                          return 0;
                        })
                    }else{
                        aux = aux.sort((a,b) => {if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                          }
                          if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1;
                          }
                          // a must be equal to b
                          return 0;
                        })
                    }
                }
                //FILTRADO POR RATING
                if(ratingOrder !== 'none'){
                    if (ratingOrder === '5-0'){
                        aux = aux.sort((a,b) => a.rating - b.rating)
                    }else{
                        aux = aux.sort((a,b) => b.rating - a.rating)
                    }
                }
                //FILTRADO POR GENEROS
                if(genresFilter.length){
                    aux = aux.filter(game => {
                        let coincidences = 0
                        for(let i = 0; i < genresFilter.length; i++){
                            for(let j = 0; j < game.Genres.length; j++){
                                if(game.Genres[j].name === genresFilter[i]){
                                    coincidences += 1
                                }
                            }
                        }
                        if(coincidences < genresFilter.length){
                            return false
                        }else return true
                    })
                }
                //MAX PAGES PARA EL PAGINADO
                setMaxPage(Math.ceil(aux.length/15))
                //PAGINADO CON UN SLICE
                setGames(aux.slice((page - 1)*15, page*15))
            }
        }else{
            //SI HAY BUSQUEDA 
            setMaxPage(1)
            if (searching !== search){
                setPage(1)
                setMaxPage(0)
                setSearching(search)
                compare(search)
            }else if(gamesByName.length && gamesByName[0].msg){
                console.log('hola')
                setGames([])
                setError(true)
            }else if (gamesByName.length){
                let aux = [...gamesByName]
                console.log(aux)
                //FILTRADO POR CREACION
                if(createdBy !== 'all'){
                    if(createdBy === 'created'){
                        aux = aux.filter(game => game.Id.toString().includes('-') === true)
                    }else{
                        aux = aux.filter(game => game.Id.toString().includes('-') === false)
                    }
                }
                //FILTRADO POR ORDEN ALFABETICO
                if(alfabeticalOrder !== 'none'){
                    if(alfabeticalOrder === 'a-z'){
                        aux = aux.sort((a,b) => {if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                          }
                          if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                          }
                          // a must be equal to b
                          return 0;
                        })
                    }else{
                        aux = aux.sort((a,b) => {if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                          }
                          if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1;
                          }
                          // a must be equal to b
                          return 0;
                        })
                    }
                }
                //FILTRADO POR RATING
                if(ratingOrder !== 'none'){
                    if (ratingOrder === '5-0'){
                        aux = aux.sort((a,b) => a.rating - b.rating)
                    }else{
                        aux = aux.sort((a,b) => b.rating - a.rating)
                    }
                }
                //FILTRADO POR GENEROS
                if(genresFilter.length){
                    aux = aux.filter(game => {
                        let coincidences = 0
                        for(let i = 0; i < genresFilter.length; i++){
                            for(let j = 0; j < game.Genres.length; j++){
                                if(game.Genres[j].name === genresFilter[i]){
                                    coincidences += 1
                                }
                            }
                        }
                        if(coincidences < genresFilter.length){
                            return false
                        }else return true
                    })
                }
                setGames(aux)
            }
        }
    }, [games, page, maxPage, getGames, search, gamesByName, searching, clearGamesByName, createdBy, alfabeticalOrder, ratingOrder, genresFilter])

    //USE EFFECT PARA VOLVER A LA PAG 1 AL CAMBIAR FILTROS
    useEffect(()=>{
        setPage(1)
    }, [createdBy,alfabeticalOrder,ratingOrder,setPage,genresFilter])

    //FUNCIONES PARA EL PAGINADO, INNECESARIO HACERLO EN REDUX
    function nextPage(){
        if(page < maxPage){
            setPage(page + 1)
        }
    }

    function previousPage(){
        if(page > 1){
            setPage(page - 1)
        }
    }

    function handlePage(num){
        setPage(num)
    }

    function handleChange(e){
        setSearch(e.target.value)
    }



    return<div className='home'>
        <div className='searchAndFilters'>
        <input placeholder='Search...' value={search} onChange={handleChange} className={'buscador'}/>
        <Filtrado/>
        </div>
        <div className='cartitas'>
        {error? <div className='noGamesFound'><h1>No Games Found</h1></div> : null}
        {games.length? 
        gamesToShow.map(game => {return <Cards key={game.Id} image={game.image} Id={game.Id} name={game.name} Genres={game.Genres}/>}) 
        : <div className='homeLoading'><Spinner/></div>}
        </div>
        {maxPage > 1? <BotonesPaginado page={page} nextPage={nextPage} previousPage={previousPage} maxPage={maxPage} setPage={handlePage}/> : false}
    </div>
}




function mapStateToProps(state){
    return{
        games: state.games,
        gamesByName: state.gamesByName,
        ratingOrder: state.ratingOrder,
        alfabeticalOrder: state.alfabeticalOrder,
        createdBy: state.createdBy,
        genresFilter: state.genresFilter
    }
}

function mapDispatchToProps(dispatch){
    return{
        getGames: store => dispatch(getGames(store)),
        clearGamesByName: store => dispatch(clearGamesByName(store))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)