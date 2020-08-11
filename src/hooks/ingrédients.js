import { apiFetch } from "../utils/api"
import { useReducer } from "react"

function reducer(state, action){
    console.log('INGREDIENTS REDUCE', action.type, action)
    switch (action.type){

        case 'FETCHING_INGREDIENTS':
            return { ...state, loading: true }
        case 'SET_INGREDIENTS':
        return { ...state, ingrédients: action.payload, loading: false}
        case 'DELETE_INGREDIENT':
        return { ...state, ingrédients: state.ingrédients.filter(ingrédient => ingrédient !== action.payload)}
        case 'ADD_INGREDIENTS':
        return { ...state, ingrédients: [...state.ingrédients, action.payload]}
        case 'UPDATE_INGREDIENTS':
        return { ...state, ingrédients: state.ingrédients.map(ingrédient => ingrédient === action.target ? action.payload : ingrédient)}
    }
}


export function useIngrédients(){
    const [state, dispatch] = useReducer(reducer, {
        ingrédients: null,
        loading: false,
    })

    return {
        ingrédients: state.ingrédients,
        fetchIngrédients: async function (){
            if (state.loading || state.ingrédients){
                return;
            }
            dispatch({ type: 'FETCHING_INGREDIENTS'})
            const ingrédients = await apiFetch('/ingredients')
            dispatch({type: 'SET_INGREDIENTS', payload: ingrédients})
        },
        deleteIngrédient: async function (ingredient){
            await apiFetch('/ingredients/' + ingredient.id, {
                method: 'GET'
            })
            dispatch({ type: 'DELETE_INGREDIENT', payload: ingredient})
        }
    }
}