import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader';
import { Button } from '../../ui/Button';

export function Ingrédients({ingrédients, onDelete}){
    return <div>
        <h1>Ingrédients</h1>
        {ingrédients === null ? <Loader /> : <IngrédientsList ingrédients={ingrédients} onDelete={onDelete}/>}
        </div>
}

function IngrédientsList({ingrédients, onDelete}){
    return <ul>
       {ingrédients.map(ingrédient => <Ingrédient key={ingrédient.id} ingrédient={ingrédient} onDelete={onDelete}/>)}
        </ul>
}

function Ingrédient ({ingrédient, onDelete}){

    const [loading, setLoading] = useState(false)
    const handleDelete = async function (e){
        e.preventDefault()
        setLoading(true)
        await onDelete(ingrédient)
       
    }
    return <li>
        {ingrédient.title}
        <Button type="danger" onClick={handleDelete} loading={loading}>Supprimer</Button>
        </li>
}

