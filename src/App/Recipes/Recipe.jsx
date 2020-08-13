import React from 'react'
import PropTypes from 'prop-types'

export function Recipe(recipe) {
    return (
        <div>
            <h1>{recipe.title}</h1>
        </div>
    )
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired
}



