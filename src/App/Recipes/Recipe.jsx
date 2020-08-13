import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader'
import { Modal } from '../../ui/Modal'

export function Recipe({recipe}) {
    return (
        <Modal title={recipe.title} onClose={() => null}>
            {!recipe.content ?  
            <Loader/> :
            <RecipeDetail recipe={recipe} />
            }
        </Modal>
    )
}

function RecipeDetail({recipe}) {

    const htmlContent = {__html: recipe.content.split("\n").join('<br/>')}

    return <div dangerouslySetInnerHTML={htmlContent}> 
       
    </div>
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired
}





