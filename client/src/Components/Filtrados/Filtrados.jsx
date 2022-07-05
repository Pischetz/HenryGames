import { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import { getGenres, setAlfabeticalOrder, setCreatedBy, setGenres, setRatingOrder } from '../../Actions/Actions'
import './Filtrados.css'


function Filtrado(props){
    let [creationFilter, setCreationFilter] = useState('all')
    let [alfabeticalFilter, setAlfabeticalFilter] = useState('none')
    let [ratingFilter, setRatingFilter] = useState('none')
    let [genreFilter, setGenreFilter] = useState([])
    let {genres, getGenres, setCreatedBy, setAlfabeticalOrder, setRatingOrder, setGenres} = props

    function creationHandler(e){
        setCreationFilter(e.target.value)
    }
    function nameHandler(e){
        setRatingFilter('none')
        setAlfabeticalFilter(e.target.value)
    }
    function ratingHandler(e){
        setAlfabeticalFilter('none')
        setRatingFilter(e.target.value)
    }
    function genreHandler(e){
        if(genreFilter.includes(e.target.value)){
            setGenreFilter(genreFilter.filter(genre => genre !== e.target.value))
        }else{
            setGenreFilter([...genreFilter, e.target.value])
        }
    }

    useEffect(() => {
        if(!genres.length){
            getGenres()
        }
        setCreatedBy(creationFilter)
        setAlfabeticalOrder(alfabeticalFilter)
        setRatingOrder(ratingFilter)
        setGenres(genreFilter)
    }, [genres, getGenres, creationFilter, setCreatedBy,alfabeticalFilter, setAlfabeticalOrder, ratingFilter, setRatingOrder,genreFilter,setGenres])

    return <div className="filters">
        <div className='dropdown'>
            <span className='filter'>Generos</span>
            <div className='dropdown-content'> 
                {genres.map(genre => {return <div className='genre' key={genre.Id}><input type={'checkbox'} key={genre.name} label={genre.name} value={genre.name} name='genres' onChange={genreHandler}/></div>})}
            </div>
        </div>
        <div className='dropdown'>
            <span className='filter'>Creación</span>
            <div className='dropdown-content'>
                <input label={'All'} value='all' type={'radio'} name='creation' checked={creationFilter === 'all'} onChange={creationHandler}/>
                <input label='Created' value='created' type={'radio'} name='creation' checked={creationFilter === 'created'} onChange={creationHandler}/>
                <input label='Existing' value='existing' type={'radio'} name='creation' checked={creationFilter === 'existing'} onChange={creationHandler}/>
            </div>
        </div>
        <div className='dropdown'>
        <span className='filter'>Nombre</span>
            <div className='dropdown-content'>
                <input label='None' value='none' type={'radio'} name='name' checked={alfabeticalFilter === 'none'} onChange={nameHandler}/>
                <input label='A-Z' value='a-z' type={'radio'} name='name' checked={alfabeticalFilter === 'a-z'} onChange={nameHandler}/>
                <input label='Z-A' value='z-a' type={'radio'} name='name' checked={alfabeticalFilter === 'z-a'} onChange={nameHandler}/>
            </div>
        </div>
        <div className='dropdown'>
            <span className='filter'>Rating</span>
            <div className='dropdown-content'>
                <input label='None' value='none' type={'radio'} name='rating' checked={ratingFilter === 'none'} onChange={ratingHandler}/>
                <input label='5-0' value='0-5' type={'radio'} name='rating' checked={ratingFilter === '0-5'} onChange={ratingHandler}/>
                <input label='0-5' value='5-0' type={'radio'} name='rating' checked={ratingFilter === '5-0'} onChange={ratingHandler}/>
            </div>
        </div>
    </div>
}

function mapStateToProps(state){
    return {
        genres: state.genres
    }
}

function mapDispatchToProps(dispatch){
    return {
        getGenres: store => dispatch(getGenres(store)),
        setCreatedBy: store => dispatch(setCreatedBy(store)),
        setAlfabeticalOrder: store => dispatch(setAlfabeticalOrder(store)),
        setRatingOrder: store => dispatch(setRatingOrder(store)),
        setGenres: store => dispatch(setGenres(store))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtrado)