import { createStore } from 'redux'
import { initialState } from './state'

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'deleteCartoon':
			return {
				...state,
				cartoons: [
					...state.cartoons.filter(
						item => item.cartonNumber !== action.cartonNumber
					),
				],
			}
		case 'findIndexOfCartoon':
			const Id = state.cartoons.findIndex(
				({ cartonNumber }) => cartonNumber === action.cartonNumber
			)

			return {
				...state,
				opendCartoon: Id,
			}
		default:
			return state
	}
}

export const actions = {
	deleteCartoonFromList: cartonNumber => ({
		type: 'deleteCartoon',
		cartonNumber,
	}),
	findIndexOfCartoon: cartonNumber => ({
		type: 'findIndexOfCartoon',
		cartonNumber,
	}),
}

export const store = createStore(rootReducer)
