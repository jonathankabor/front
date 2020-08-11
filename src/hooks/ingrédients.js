import { apiFetch } from "../utils/api"
import { useReducer } from "react"

function reducer(state, action){
    console.log('INGREDIENTS REDUCE', action.type, action)
    switch (action.type){

        case 'SET_INGREDIENTS':
        return { ...state, ingrédients: action.payload}
    }
}


export function useIngrédients(){
    const [state, dispatch] = useReducer(reducer, {
        ingrédients: null
    })

    return {
        ingrédients: state.ingrédients,
        fetchIngrédients: async function (){
            const ingrédients = await apiFetch('/ingrédients')
            dispatch({type: 'SET_INGREDIENTS', payload: ingrédients})
        }
    }
}