import { useEffect } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {getGames} from '../../Actions/Actions'
import Spinner from '../Spinner/Spinner';
import './Landing.css'

function Landing(props){

    let {games, getGames} = props
    useEffect(() => {
        if(!games.length){
            getGames() 
        }
    }, [games, getGames])
    
    return <div className="landing">
    <div className="izquierda">
      {games.length? <Link to={'/videogames'}><button className="a">Lets Go!</button></Link>: <Spinner/>}
    </div>
    <div className="derecha">
    
    </div>
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