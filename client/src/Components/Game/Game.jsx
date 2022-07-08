import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { clearGameDetails, getGameDetails } from "../../Actions/Actions"
import ReactHtmlParser from 'react-html-parser'
import './Game.css'
import Spinner from "../Spinner/Spinner"
import defaultImg from '../../Images/cubo.jpg'

function Game(props){
    let {id} = useParams()
    let {getGameDetails, clearGameDetails, data} = props

    useEffect(()=>{
        getGameDetails(id)
        return clearGameDetails()
    }, [id, getGameDetails, clearGameDetails,])

    return <div>
        {Object.keys(data).length?
        <div className="infoContainer">
        <div className="everything">
            <div className="imageDiv">
                 <img src={data.image? data.image: defaultImg} alt="" className="image"/> 
            </div>
            <div className="info">
                <h2>{data.name}</h2>
                <div className="specificInfo">
                <h4>Release Date</h4>
                {data.released?<p>{data.released}</p> : <p>Unknown Release Date</p>}
                </div>
                <div className="specificInfo">
                <h4>Genres</h4>
                <p>{Object.keys(data).length? data.Genres.map(genre => genre = genre.name).join(', '): null}</p>
                </div>
                <div className="specificInfo">
                <h4>Rating</h4>
                {data.rating?<p>{data.rating} / 5 stars</p> : <p>Unrated</p>}
                </div>
                <div className="specificInfo">
                <h4>Platforms</h4>
                <p>{Object.keys(data).length? data.platforms.join(', '): null}</p>
                </div>
            </div>
        </div>
        <div className="description">
            {ReactHtmlParser(data.description)}
        </div>
    </div>
    : <div className="loading"><Spinner/></div>}
    </div> 
}

function mapStateToProps(state){
    return{
        data: state.dataGame
    }
}

function mapDispatchToProps(dispatch){
    return{
        getGameDetails: store => dispatch(getGameDetails(store)),
        clearGameDetails: store => dispatch(clearGameDetails(store))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game)