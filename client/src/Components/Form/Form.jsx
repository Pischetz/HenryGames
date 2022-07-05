import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getGenres, postGames } from '../../Actions/Actions'
import './Form.css'

function Form(props){
    let [date, setDate] = useState('')
    let [error, setError] = useState({})
    let [formName, setFormName] = useState('')
    let [formDescription, setFormDescription] = useState('')
    let [formRating, setFormRating] = useState(0)
    let [formPlatforms, setFormPlatforms] = useState([])
    let [formGenres, setFormGenres] = useState([])
    const platforms = ['Playstation 4', 'Playstation 5', 'Xbox', 'Windows', 'Linux', 'Mac', 'Android', 'Ios' ]
    const {genres, getGenres, postGames} = props

    useEffect(() => {
        if(!genres.length){
            getGenres()
        }
    },[genres, getGenres])


    function handleSubmit(e){
        e.preventDefault()
        postGames({
            name: formName,
            description: formDescription,
            rating: formRating,
            platforms: formPlatforms,
            genres: formGenres,
            release: date
        })
    }
    function handleRating(e){
        setFormRating(e.target.value)
    }
    function handleName(e){
        setFormName(e.target.value)
    }
    function handleDescription(e){
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
        setDate(e.target.value)
    }

    return <div className="form">
        <h1>Add a New Game</h1>
        <form onSubmit={handleSubmit}>
        <div className='formContainer'>
        <div className='leftContainer'>
            <label htmlFor='name' className='labels'>
            Name
            <input type={'text'} id='name' value={formName} onChange={handleName}/>
            </label>
            <label htmlFor='description' className='labels'>
            Description
            <textarea id='description' value={formDescription} onChange={handleDescription}/>
            </label>
            <label htmlFor='dateInput' className='labels'>
            Released
            <input type={'date'} value={date} onChange={handleDate} id='dateInput'/>
            </label>
            <label htmlFor='ratingInput' className='labels'>
            Rating
            <input type={'number'} id='ratingInput' value={formRating} onChange={handleRating}/>
            </label>
        </div>
        <div className='rightContainer'>
            <label htmlFor='platforms' className='labels'>
            Platforms
            <div className='genresDiv'>
            {platforms.map(p => <input type={'checkbox'} label={p} className='genresChecks' key={p} value={p} name={'plat'} onChange={handlePlatforms}/>)}
            </div>
            </label>
            <label htmlFor='genres' className='labels'>
            Genres
            <div className='genresDiv'>
            {genres.map(g => <input type={'checkbox'} label={g.name} className='genresChecks' key={g.Id} value={g.Id} onChange={handleGenres} name={'gen'}/>)}
            </div>
            </label>
        </div>
        </div>
        <input type={'submit'}/>
        </form>
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
        postGames: store => dispatch(postGames(store))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form)