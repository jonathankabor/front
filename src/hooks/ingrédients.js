import { apiFetch } from "../utils/api"
import { useReducer } from "react"

function reducer(state, action){
    console.log('INGREDIENTS REDUCE', action.type, action)
    switch (action.type){

        case 'FETCHING_INGREDIENTS':
            return { ...state, loading: true }
        case 'SET_INGREDIENTS':
        return { ...state, ingrédients: action.payload, loading: false}
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
        }
    }
}