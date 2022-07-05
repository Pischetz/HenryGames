import { useEffect } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {getGames} from '../../Actions/Actions'
import Spinner from '../Spinner/Spinner';


function Landing(props){

    let {games, getGames} = props

    useEffect(() => {
        if(!games.length){
            getGames() 
        }
    }, [games, getGames])
    
    return<div>
        <Spinner/>
        {props.games.length?  <Link to={'/videogames'}><button>Nos vamos pa la Home</button></Link> : 'Cargando Papu'}
    </div>
}

function mapStateToProps(state){
    return{
        games: state.games
    }
}

function mapDispatchToProps(dispatch){
    return{getGames: store => dispatch(getGames(store))}
}

export default connect(mapStateToProps,mapDispatchToProps)(Landing)