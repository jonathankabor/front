import React from 'react'
import PropTypes from 'prop-types'
import { Field } from '../../ui/Field'
import { Loader } from '../../ui/Loader'


export function RecipeForm({ingrédients}) {

    const handleSelectIngredient = function (ingrédient) {
        console.log(ingrédient)

    }
    return <div className="row">
                <div className="col-md-6">
                    <Field name="title">Titre</Field>
                    <Field name="short" type="textarea">Description courte</Field>
                    <Field name="content" type="textarea">Description</Field>
                </div>
                <div className="col-md-6">
                    <h5>Ingrédients</h5>
                        {ingrédients ? <Select ingrédients={ingrédients} onChange={handleSelectIngredient}/> : <Loader/>}
                </div>
            </div>
}
/**
 * Select pour sélectionner un ingrédient
 * @param {{ingredients: array}} param0 
 */

function Select ({ingrédients, onChange}) {
    const handleChange = function (e){
        onChange(ingrédients[parseInt(e.target.value, 10)])
    }
    return <select className="form-control" onChange={handleChange}> 
                <option>Sélectionner un ingrédient</option>
                    {ingrédients.map(i => <option key={i.id} value={i.id}>{i.title}
                </option>)}
            </select>
}   

RecipeForm.propTypes = {
    ingrédients: PropTypes.array,

}



