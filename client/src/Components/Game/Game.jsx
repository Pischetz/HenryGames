import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { clearGameDetails, getGameDetails } from "../../Actions/Actions"
import ReactHtmlParser from 'react-html-parser'
import './Game.css'
import Spinner from "../Spinner/Spinner"


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
                <img src={data.image} alt="" className="image"/>
            </div>
            <div className="info">
                <h2>{data.name}</h2>
                <p>{data.released}</p>
                <p>{Object.keys(data).length? data.Genres.map(genre => genre = genre.name).join(', '): null}</p>
                <p>{data.rating}</p>
                <p>{Object.keys(data).length? data.platforms.join(', '): null}</p>
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