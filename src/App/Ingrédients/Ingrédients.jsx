import React from 'react';
import PropTypes from 'prop-types'

export function Ingrédients({ingrédients}){
    return <div>
        <h1>Ingrédients</h1>
        {JSON.stringify(ingrédients)}
        </div>
}

Ingrédients.propTypes = {
    ingrédients: PropTypes.array
}