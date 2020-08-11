import React, { useState } from 'react';

export function Site(){

const [page, setPage] = useState('ingrédients')

return <>
    <NavBar currentPage={page} onClick={setPage}/>
    <p>{page}</p>
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
    <a href="#" className="navbar-brand">Recettes</a>
    <ul className="navbar-nav mr-auto">
        <li className={navClass('recipes')}>
            <a href="" className="nav-link" onClick={() => onClick('recipes')}>Recettes</a>
        </li>
        <li className={navClass('ingrédients')}>
            <a href="" className="nav-link" onClick={() => onClick('ingrédients')}>Ingrédients</a>
        </li>
    </ul>
    </nav>
}