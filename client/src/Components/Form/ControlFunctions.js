export function controlDate(date, errorObject, errorSetter){
    if(!date){
        errorSetter({
            ...errorObject,
            releaseError: 'Release date is required'
        })
        return false
    }else if(!/^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(date)){
        errorSetter({
            ...errorObject,
            releaseError: 'Please add a correct date format'
        })
        return false
    }else{
        errorSetter({
            ...errorObject,
            releaseError: ''
        })
        return true
    }
}

export function controlName(name, errorObject, errorSetter){
    if(!name){
        errorSetter({
            ...errorObject,
            nameError: 'Game name is required'
        })
        return false
    }else{
        errorSetter({
            ...errorObject,
            nameError: ''
        })
        return true
    }
}

export function controlDescription(description, errorObject, errorSetter){
    if(!description){
        errorSetter({
            ...errorObject,
            descriptionError: 'Game description is required'
        })
        return false
    }else{
        errorSetter({
            ...errorObject,
            descriptionError: ''
        })
        return true
    }
}

export function controlRating(rating, errorObject, errorSetter){
    if(!rating && rating !== 0){
        errorSetter({
            ...errorObject,
            ratingError: 'Game rating is required'
        })
        return false
    }else if(typeof rating !== 'number'){
        errorSetter({
            ...errorObject,
            ratingError: 'Game rating must be a number'
        })
        return false
    }else if(rating > 5 || rating < 0){
        errorSetter({
            ...errorObject,
            ratingError: 'Game Rating must be between 0 and 5'
        })
        return false
    }else{
        errorSetter({
            ...errorObject,
            ratingError: ''
        })
        return true
    }
}

export function controlPlatforms(platforms, errorObject, errorSetter){
    if(!platforms.length){
        errorSetter({
            ...errorObject,
            platformsError: 'Game must have at least one platform'
        })
        return false
    }else if(platforms.length > 5){
        errorSetter({
            ...errorObject,
            platformsError: 'Too many platforms, select up to five!'
        })
        return false
    }else{
        errorSetter({
            ...errorObject,
            platformsError: ''
        })
        return true
    }
}

export function controlGenres(genres, errorObject, errorSetter){
    if(!genres.length){
        errorSetter({
            ...errorObject,
            genresError: 'Game must have at least one genre'
        })
        return false
    }else if(genres.length > 3){
        errorSetter({
            ...errorObject,
            genresError: 'Too many genres, select up to three!'
        })
        return false
    }else{
        errorSetter({
            ...errorObject,
            genresError: ''
        })
        return true
    }
}

export function controlDisabledSubmit(obj){
    for (let key in obj){
        if (Array.isArray(obj[key])){
            if(!obj[key].length){
                return true
            }
        }else if(!obj[key]){
            return true
        }
    }
    return false
}

export function controlSubmitting(obj, errorObject, errorSetter){
    if(controlDate(obj.released, errorObject, errorSetter)
    && controlName(obj.name, errorObject, errorSetter) 
    && controlDescription(obj.description, errorObject, errorSetter) 
    && controlGenres(obj.genres, errorObject, errorSetter) 
    && controlPlatforms(obj.platforms, errorObject, errorSetter) 
    && controlRating(obj.rating, errorObject, errorSetter)){
        return true
    }else{
        return false
    }
}
