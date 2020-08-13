import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader'
import { Modal } from '../../ui/Modal'

export function Recipe({recipe}) {
    return (
        <Modal title={recipe.title} onClose={() => null}>
            {recipe.content ? recipe.content : <Loader/>}
        </Modal>
    )
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired
}



