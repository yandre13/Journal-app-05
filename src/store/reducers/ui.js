import { TYPES } from 'store/types'

const initialState = {
	loading: false,
	messageError: '',
}

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.UI_START_LOADING:
			return { ...state, loading: true }
		case TYPES.UI_FINISH_LOADING:
			return { ...state, loading: false }
		default:
			return state
	}
}
