const initialState = {
    games: [],
    gamesByName:[],
    genres:[],
    dataPost:{},
    dataGame:{},
    createdBy: 'all',
    alfabeticalOrder: 'none',
    ratingOrder: 'none',
    genresFilter:[]
}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_GAMES_BY_NAME':
            return {
                ...state,
                gamesByName: action.payload
            }
        case 'GET_GAMES':
            return{
                ...state,
                games: action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        case 'POST_GAME':
            return{
                ...state,
                dataPost: action.payload
            }
        case 'GET_GAME_DETAILS':
            return{
                ...state,
                dataGame: action.payload
            }
        case 'CLEAR_GAME_DETAILS':
            return{
                ...state,
                dataGame: action.payload
            }
        case 'CLEAR_GAMES_BY_NAME':
            return{
                ...state,
                gamesByName: action.payload
            }
        case 'FILTER_CREATED_BY':
            return{
                ...state,
                createdBy: action.payload
            }
        case 'FILTER_ALFABETICAL_ORDER':
            return{
                ...state,
                alfabeticalOrder: action.payload
            }
        case 'FILTER_RATING_ORDER':
            return{
                ...state,
                ratingOrder: action.payload
            }
        case 'FILTER_BY_GENRE':
            return{
                ...state,
                genresFilter: action.payload
            }
        default:
            return state
    }
}