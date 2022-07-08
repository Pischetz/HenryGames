import './Nav.css'
import { AiOutlineHome, AiOutlineForm } from "react-icons/ai"
import { Link } from 'react-router-dom'

export default function Nav(){
    return <div className="nav">
        <div className="pageTitle">
            HenryGames
        </div>
        <Link to={'/videogames'}> 
        <div className='Icons'>
        <AiOutlineHome/>
        </div>
        </Link>
        <Link to={'/create'}>
        <div className='Icons'>
        <AiOutlineForm/>
        </div>
        </Link>
        {/* <div className='linksContainer'>
        <div>
        <Link to={'/videogames'} className='links'>
            <h3>Home</h3>
        </Link>
        </div>
        <div >
        <Link to={'/create'} className='links'>
            <h3>Create</h3>
        </Link>
        </div>
        </div> */}
    </div>
}