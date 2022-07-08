import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { clearAllGames, getGenres, postGames } from '../../Actions/Actions'
import { controlDate, controlDescription, controlDisabledSubmit, controlGenres, controlName, controlPlatforms, controlRating, controlSubmitting } from './ControlFunctions'
import './Form.css'
import {Redirect} from 'react-router-dom'


function Form(props){
    let [date, setDate] = useState('')
    let [error, setError] = useState({
        nameError: '',
        descriptionError: '',
        releaseError: '',
        ratingError: '',
        platformsError: '',
        genresError: ''
    })
    let [formName, setFormName] = useState('')
    let [formDescription, setFormDescription] = useState('')
    let [formRating, setFormRating] = useState(0)
    let [formPlatforms, setFormPlatforms] = useState([])
    let [formGenres, setFormGenres] = useState([])
    const platforms = ['Playstation 4', 'Playstation 5', 'Xbox', 'Windows', 'Linux', 'Mac', 'Android', 'Ios' ]
    const {genres, getGenres, postGames, clear} = props
    let [redir,setRedir] = useState(false) 
    useEffect(() => {
        if(!genres.length){
            getGenres()
        }
    },[genres, getGenres])

    useEffect(() => {
        controlPlatforms(formPlatforms, error, setError)// eslint-disable-next-line
    }, [formPlatforms])    

    useEffect(() => {
        controlGenres(formGenres, error, setError)// eslint-disable-next-line
    }, [formGenres])

    function handleSubmit(e){
        e.preventDefault()
        let aux = {
            name: formName,
            description: formDescription,
            rating: parseInt(formRating),
            platforms: formPlatforms,
            genres: formGenres,
            released: date
        }
        if(controlSubmitting(aux, error, setError)){
            postGames(aux)
            clear()
            alert(`Juego ${formName} creado con exito!!`)
            setRedir(true)
        }else{
            alert('Completar los campos correctamente')
        }
    }
    function handleRating(e){
        controlRating(parseInt(e.target.value), error, setError)
        setFormRating(e.target.value)
    }
    function handleName(e){
        controlName(e.target.value, error, setError)
        setFormName(e.target.value)
    }
    function handleDescription(e){
        controlDescription(e.target.value, error, setError)
        setFormDescription(e.target.value)
    }
    function handlePlatforms(e){
        if(formPlatforms.includes(e.target.value)){
            setFormPlatforms(formPlatforms.filter(p => p !== e.target.value))
        }else{
            setFormPlatforms([...formPlatforms, e.target.value])
        }
    }

    function handleGenres(e){
        if(formGenres.includes(e.target.value)){
            setFormGenres(formGenres.filter(g => g !== e.target.value))
        }else{
            setFormGenres([...formGenres, e.target.value])
        }

    }
    function handleDate(e){
        controlDate(e.target.value, error, setError)
        setDate(e.target.value)
    }
    function submitcheck(){
        if(controlDisabledSubmit({
            name: formName,
            description: formDescription,
            rating: formRating,
            platforms: formPlatforms,
            genres: formGenres,
            released: date
        })){
            return true
        }else{
            return false
        }
    }

    return <div className="form">
        <h1>Add a New Game</h1>
        <form onSubmit={handleSubmit}>
        <div className='formContainer'>
        <div className='leftContainer'>
            <label htmlFor='name' className='labels'>
            Name
            <input type={'text'} id='name' value={formName} onChange={handleName}/>
            <span className='errors'>{error.nameError}</span>
            </label>
            <label htmlFor='description' className='labels'>
            Description
            <textarea id='description' value={formDescription} onChange={handleDescription}/>
            <span className='errors'>{error.descriptionError}</span>
            </label>
            <div className='smallInputs'>
            <label htmlFor='dateInput' className='labels'>
            Released
            <input type={'date'} value={date} onChange={handleDate} id='dateInput' />
            <span className='errors'>{error.releaseError}</span>
            </label>
            <label htmlFor='ratingInput' className='labels'>
            Rating
            <input type={'number'} id='ratingInput' value={formRating} onChange={handleRating} />
            <span className='errors'>{error.ratingError}</span>
            </label>
            </div>
        </div>
        <div className='rightContainer'>
            <label htmlFor='platforms' className='labels'>
            Platforms
            <div className='genresDiv'>
            {platforms.map(p => <input type={'checkbox'} label={p} className='genresChecks' key={p} value={p} name={'plat'} onChange={handlePlatforms}/>)}
            </div>
            <span className='errors'>{error.platformsError}</span>
            </label>
            <label htmlFor='genres' className='labels'>
            Genres
            <div className='genresDiv'>
            {genres.map(g => <input type={'checkbox'} label={g.name} className='genresChecks' key={g.Id} value={g.Id} onChange={handleGenres} name={'gen'}/>)}
            </div>
            <span className='errors'>{error.genresError}</span>
            </label>
        </div>
        </div>
        <input type={'submit'} value={'Create'} disabled={submitcheck() === true}/>
        </form>
        {redir? <Redirect to={'/videogames'}/>: null}
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
        postGames: store => dispatch(postGames(store)),
        clear: store => dispatch(clearAllGames(store))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form)