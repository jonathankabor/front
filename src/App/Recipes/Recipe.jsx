import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader'
import { Modal } from '../../ui/Modal'
import { useToggle } from '../../hooks'
import { EditRecipeForm } from './RecipeForm'

export function Recipe({recipe, onClose, onEdit}) {
    return (
        <Modal title={recipe.title} onClose={onClose}>
            {!recipe.ingredients ?  
            <Loader/> :
            <RecipeDetail recipe={recipe} onEdit={onEdit} />
            }
        </Modal>
    )
}

function RecipeDetail({recipe, ingredients, onEdit}) {

    const [editMode, toggleEditMode] = useToggle(false)
    const htmlContent =  { __html: recipe.content.split("\n").join('<br/>')}

    const handleEditMode = function (){
        toggleEditMode()
        onEdit()
    }

    return editMode ? <EditRecipeForm recipe={recipe} ingredients={ingredients} />: <>
        <div dangerouslySetInnerHTML={htmlContent}></div>
        <h4 className="mt-4">Ingrédients</h4>
        <ul>
        {recipe.ingredients.map(i => <IngredientRow ingredient={i} key={i.id}/>)}
        </ul>
        <button onClick={handleEditMode}>Editer</button>
    </>
}

function IngredientRow ({ingredient}) {
    return <li>
        <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.title}
    </li>

}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired,
}





