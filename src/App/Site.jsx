import React, { useState, useEffect } from 'react';
import { useIngrédients } from '../hooks/ingrédients';
import { Ingrédients } from './Ingrédients/Ingrédients';
import { Recipes } from './Recipes/Recipes';
import { Recipe } from './Recipes/Recipe';
import { useRecipes } from '../hooks/recipes';

export function Site(){

const [page, setPage] = useState('recipes')
const {
    ingrédients,
    fetchIngrédients,
    deleteIngrédient,
    updateIngrédient,
    createIngrédient
} = useIngrédients()
const{
    recipes,
    recipe,
    fetchRecipes,
    fetchRecipe,
    deselectRecipe,
} = useRecipes()

let content = null
if(page === 'ingrédients'){
    content = <Ingrédients 
    ingrédients={ingrédients} 
    onDelete={deleteIngrédient}
    onUpdate={updateIngrédient}
    onCreate={createIngrédient}
    />
}else if (page === 'recipes') {
    content = <Recipes recipes={recipes} onClick={fetchRecipe}/>
}

useEffect(function () {
    if(page === 'ingrédients') {
        fetchIngrédients()
    }
    if (page === 'recipes'){
        fetchRecipes()
    }
}, [page, fetchIngrédients])

return <>
    <NavBar currentPage={page} onClick={setPage}/>
    <div className="container">
        {recipe ? <Recipe recipe={recipe} onClose={deselectRecipe}/> : null}
        {content}
    </div>
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