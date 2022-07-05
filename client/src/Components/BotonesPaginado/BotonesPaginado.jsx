import { useEffect, useState } from "react";
import './BotonesPaginado.css'

export default function BotonesPaginado(props){
    let {page, nextPage, previousPage, maxPage, setPage} = props
    let [pages, setPages] = useState([])

    useEffect(()=>{
        if(maxPage >= 5){
            if(page <= 3){
                setPages([1,2,3,4,5]) 
            }else if(page > 3 && page < maxPage - 2){
                setPages([page-2, page-1, page, page + 1, page + 2])
            }else if(page >= maxPage - 2){
                setPages([maxPage - 4, maxPage -3, maxPage -2, maxPage -1, maxPage])
            }
        }
        if(maxPage < 5 && maxPage > 1){
            let aux = []
            for(let i = 1; i <= maxPage; i++){
                aux.push(i)
            }
            setPages(aux)
        }
    },[page, maxPage])


    function handleNext(){
        nextPage()
    }

    function handlePrevious(){
        previousPage()
    }

    function handlePage(e){
        let num = parseInt(e.target.value)
        setPage(num)
    }


    return <div>
        <button onClick={handlePrevious}>&lt;---</button>
        {pages.map(num => {
            if(num === page){
                return <button key={num} className={'actual botoncito'} >{num}</button>
            }else{
                return <button key={num} className={'botoncito'} onClick={handlePage} value={num}>{num}</button>
            }
        })}
        <button onClick={handleNext}>---&gt;</button>
    </div>
}