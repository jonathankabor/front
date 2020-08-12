import { useReducer, useCallback } from "react"
import { apiFetch } from "../utils/api"

function reducer(state, action){
    console.log('INGREDIENTS REDUCE', action.type, action)
    switch (action.type) {

        case 'FETCHING_INGREDIENTS':
            return { ...state, loading: true }
        case 'SET_INGREDIENTS':
            return { ...state, ingrédients: action.payload, loading: false}
        case 'DELETE_INGREDIENT':
            return { ...state, ingrédients: state.ingrédients.filter(i => i !== action.payload)}
        case 'ADD_INGREDIENT':
            return { ...state, ingrédients: [ action.payload, ...state.ingrédients]}
        case 'UPDATE_INGREDIENT':
            return { ...state, ingrédients: state.ingrédients.map(i => i === action.target ? action.payload : i)}
        default:
            throw new Error('Action inconnue ' + action.type)
    }
}


export function useIngrédients(){
    const [state, dispatch] = useReducer(reducer, {
        ingrédients: null,
        loading: false,
    })

    return {
        ingrédients: state.ingrédients,
        fetchIngrédients: useCallback(async function (){
            if (state.loading || state.ingrédients){
                return;
            }
            dispatch({ type: 'FETCHING_INGREDIENTS'})
            const ingrédients = await apiFetch('/ingredients')
            dispatch({type: 'SET_INGREDIENTS', payload: ingrédients})
        }, [state]),

        deleteIngrédient: useCallback(async function (ingrédient){
            await apiFetch('/ingredients/' + ingrédient.id, {
                method: 'DELETE'
            })
            dispatch({ type: 'DELETE_INGREDIENT', payload: ingrédient})
        }, []),

        updateIngrédient: useCallback(async function (ingrédient, data) {
            const newIngrédient = await apiFetch('/ingredients/' + ingrédient.id, {
                method: 'PUT',
                body: data
            })
            dispatch({ type: 'UPDATE_INGREDIENT', payload: newIngrédient, target: ingrédient})
        }, []),

        createIngrédient: useCallback(async function (data){
            const newIngrédient = await apiFetch('/ingredients', {
                method: 'POST',
                body: data
            })
            dispatch({ type: 'ADD_INGREDIENT', payload: newIngrédient})
        }, [])
    }
}