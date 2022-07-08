import { Link } from 'react-router-dom'
import './Cards.css'
import defaultImg from "../../Images/cubo.jpg"

export default function Cards(props){

    let genres = props.Genres.map(genre => genre = genre.name)
    
    return <div className='card'>
        <img src={props.image? props.image: defaultImg} alt='' className='gameImg'/>
        <div className='gameDescription'>
            <h3>{props.name}</h3>
            <div className='infoPosition'>
            <div className='cardGenres'>
            <h5>Genres:</h5>
            <p>{genres.join(', ')}</p>
            </div>
            <p><Link to={`/videogames/${props.Id}`} className={'moreInfo'}>More Info</Link></p>
            </div>
        </div>
    </div>
}