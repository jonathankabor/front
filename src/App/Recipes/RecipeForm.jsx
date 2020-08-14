import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field } from '../../ui/Field'
import { Loader } from '../../ui/Loader'
import { Button } from '../../ui/Button'
import { Trash } from '../../ui/Icon'



export function RecipeForm({ingrédients}) {

   const {
       ingrédients: recipeIngrédients,
       addIngrédient,
       updateQuantity,
       deletIngrédient,
   } = useIngrédients()

   const filteredIngrédients = (ingrédients || []).filter (ingrédient => {
    return !recipeIngrédients.some(i => i.id === ingrédient.id)
})  
    
    return <div className="row">
                <div className="col-md-6">
                    <Field name="title">Titre</Field>
                    <Field name="short" type="textarea">Description courte</Field>
                    <Field name="content" type="textarea">Description</Field>
                </div>
                <div className="col-md-6">
                    <h5>Ingrédients</h5>
                    {recipeIngrédients.map(i => <IngrédientRow ingrédient={i} key={i.id} onChange={updateQuantity} onDelete={deletIngrédient}/>)}
                        {ingrédients ? <Select ingrédients={filteredIngrédients} onChange={addIngrédient}/> : <Loader/>}
                </div>
            </div>
}

RecipeForm.propTypes = {
    ingrédients: PropTypes.array,

}

function IngrédientRow({ingrédient, onChange, onDelete}){

    const handleChange = function (e){
        onChange(ingrédient, e.target.value)
    }

    return <div className="d-flex mb-3 align-items-center">
        <div className="mr-2">
        {ingrédient.title}
        </div>
        <Field className="mb-0" defaultValue = {ingrédient.quantity} placeholder="quantité" onChange={handleChange}/>
        <div ml-2>
        {ingrédient.unit}
        </div>
        <Button type="danger" onClick={() => onDelete(ingrédient)}><Trash /></Button>
    </div>
}

function useIngrédients(){
    const [ingrédients, setIngrédients] = useState([])

    return {
        ingrédients: ingrédients,
        addIngrédient: useCallback(function (ingrédient) {
            setIngrédients(state => [...state, {...ingrédient, quantity: 0}])
        }, []),

        updateQuantity: useCallback(function(ingrédient, quantity){
            setIngrédients(state => state.map(i => i === ingrédient ? {...i, quantity}: i))
        }, []),

        deletIngrédient: useCallback(function (ingrédient){
            setIngrédients(state => state.filter(i => i !== ingrédient ))
        }, [])
    }
}

/**
 * Select pour sélectionner un ingrédient
 * @param {{ingrédients: array}} param0 
 */

function Select ({ingrédients, onChange}) {
    const handleChange = function (e){
        onChange(ingrédients[parseInt(e.target.value, 10)])
    }

    return <select className="form-control" onChange={handleChange}> 
                <option>Sélectionner un ingrédient</option>
                    {ingrédients.map(i => <option key={i.id} value={i.id}>
                        {i.title}
                </option>)}
            </select>
}   





