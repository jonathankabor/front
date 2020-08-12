import React, { useState, useEffect } from 'react';
import { useIngrédients } from '../hooks/ingrédients';
import { Ingrédients } from './Ingrédients/Ingrédients';

export function Site(){

const [page, setPage] = useState('ingrédients')
const {
    ingrédients,
    fetchIngrédients,
    deleteIngrédient,
    updateIngrédient,
    createIngrédient
} = useIngrédients()

let content = null
if(page === 'ingrédients'){
    content = <Ingrédients 
    ingrédients={ingrédients} 
    onDelete={deleteIngrédient}
    onUpdate={updateIngrédient}
    onCreate={createIngrédient}
    />
}

useEffect(function () {
    if(page === 'ingrédients'){
        fetchIngrédients()
    }
}, [page, fetchIngrédients])

return <>
    <NavBar currentPage={page} onClick={setPage}/>
    {content}
</>

}

function NavBar({currentPage, onClick}){ 

    const navClass = function (page) {
        let className = 'nav-item'
        if (page === currentPage) {
            className = ' active'
        }
        return className;
    }

    return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    <a href="#recipes" className="navbar-brand" onClick={() => onClick('recipes')}>Recettes</a>
    <ul className="navbar-nav mr-auto">
        <li className={navClass('recipes')}>
            <a href="#recipes" className="nav-link" onClick={() => onClick('recipes')}>Recettes</a>
        </li>
        <li className={navClass('ingrédients')}>
            <a href="#ingrédients" className="nav-link" onClick={() => onClick('ingrédients')}>Ingrédients</a>
        </li>
    </ul>
    </nav>
}