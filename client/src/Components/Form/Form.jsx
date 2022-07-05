import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getGenres } from '../../Actions/Actions'
import './Form.css'

function Form(props){
    let [date, setDate] = useState('')
    let [error, setError] = useState({})
    let [formName, setFormName] = useState('')
    let [formDescription, setFormDescription] = useState('')
    let [formRelease, setFormRelease] = useState('')
    let [formRating, setFormRatig] = useState(0)
    let [formPlatforms, setFormPlatforms] = useState([])
    let [formGenres, setFormGenres] = useState([])
    const platforms = ['Playstation 4', 'Playstation 5', 'Xbox', 'Windows', 'Linux', 'Mac', 'Android', 'Ios' ]
    const {genres, getGenres} = props

    useEffect(() => {
        if(!genres.length){
            getGenres()
        }
    },[genres, getGenres])


    function handleSubmit(){

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
        console.log(date)
    }

    return <div className="form">
        <h1>Add a New Game</h1>
        <form>
        <div className='formContainer'>
        <div className='leftContainer'>
            <label htmlFor='name' className='labels'>
            Name
            <input type={'text'} id='name'/>
            </label>
            <label htmlFor='description' className='labels'>
            Description
            <textarea id='description'/>
            </label>
            <label htmlFor='dateInput' className='labels'>
            Released
            <input type={'date'} value={date} onChange={handleDate} id='dateInput'/>
            </label>
            <label htmlFor='ratingInput' className='labels'>
            Rating
            <input type={'number'} id='ratingInput'/>
            </label>
        </div>
        <div className='rightContainer'>
            <label htmlFor='platforms' className='labels'>
            Platforms
            <div className='genresDiv'>
            {platforms.map(p => <input type={'checkbox'} label={p} className='genresChecks' key={p} value={p} name={'plat'}/>)}
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form)