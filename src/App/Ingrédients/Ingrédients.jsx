import React, { useState, memo } from 'react';
import { Loader } from '../../ui/Loader';
import { Button } from '../../ui/Button';
import { Trash, Upload } from '../../ui/Icon';
import { ApiErrors } from '../../utils/api';
import { Field } from '../../ui/Field';

export function Ingrédients({ingrédients, onDelete, onUpdate, onCreate}){
    return <div>
        <h1>Ingrédients</h1>
        <CreateIngrédientForm onSubmit={onCreate}/>
        {ingrédients === null ? <Loader /> : <IngrédientsList ingrédients={ingrédients} 
        onDelete={onDelete} onUpdate={onUpdate}/>}
        
        </div>
}

function IngrédientsList({ingrédients, onDelete, onUpdate}){
    return <div>
       {ingrédients.map(ingrédient => <Ingrédient key={ingrédient.id} ingrédient={ingrédient} 
       onDelete={onDelete} onUpdate={onUpdate}/>)}
        </div>
}

const Ingrédient = memo(function ({ingrédient, onDelete, onUpdate}){

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const handleDelete = async function (e){
        e.preventDefault()
        setLoading(true)
        await onDelete(ingrédient)
       
    }
    const handleSubmit = async function (e) {
        e.preventDefault()
        setErrors([])
        setLoading(true)
        try{ 
        await onUpdate(ingrédient, new FormData(e.target))

        }catch (e){
            if(e instanceof ApiErrors){
                setErrors(e.errors)
                
            }else { 
            throw e
            }
        }
        setLoading(false)
    }

    const errorFor = function (field){
        const error = errors.find(e => e.field === field)
        if (error){
            return error.message
        }
        return null
    }

    return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
        <Field  defaultValue={ingrédient.title} name="title" className="mr-2" error={errorFor('title')}/>
        <Field  defaultValue={ingrédient.unit} name="unit" className="mr-2" error={errorFor('unit')}/>
        <Button type="submit btn btn-primary" loading={loading}><Upload /></Button>
        <Button type="danger" onClick={handleDelete} loading={loading}><Trash/></Button>
        </form>
})

function CreateIngrédientForm ({onSubmit}){

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    
    const handleSubmit = async function (e) {
        const form = e.target
        e.preventDefault()
        setErrors([])
        setLoading(true)
        try{ 
        await onSubmit(new FormData(form))
            form.reset()
            form.querySelector('input').focus()
        }catch (e){
            if(e instanceof ApiErrors){
                setErrors(e.errors)
                
            }else { 
            throw e
            }
        }
        setLoading(false)
    }

    const errorFor = function (field){
        const error = errors.find(e => e.field === field)
        if (error){
            return error.message
        }
        return null
    }

    return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
        <Field  placeholder="Non de l'ingrédient" name="title" className="mr-2" error={errorFor('title')}/>
        <Field  placeholder="Unité de mesure" name="unit" className="mr-2" error={errorFor('unit')}/>
        <Button type="submit btn btn-primary" loading={loading}>Créer</Button>
        </form>
}


