import React from 'react';
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader';

export function Ingrédients({ingrédients}){
    return <div>
        <h1>Ingrédients</h1>
        {ingrédients === null ? <Loader /> : <IngrédientsList ingrédients={ingrédients}/>}
        </div>
}

function IngrédientsList({ingrédients}){
    return <ul>
       {ingrédients.map(ingrédient => <Ingrédient key={ingrédient.id} ingrédient={ingrédient}/>)}
        </ul>
}

function Ingrédient ({ingrédient}){
return <li>{ingrédient.title}</li>
}

