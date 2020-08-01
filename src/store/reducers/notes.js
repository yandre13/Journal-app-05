import { TYPES } from 'store/types'

const initialState = {
	notes: [],
	active: null,
}

export const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.NOTES_ADD_ENTRY:
			return { ...state, notes: [action.payload, ...state.notes] }
		case TYPES.NOTES_SET_ACTIVE:
			return {
				...state,
				active: { ...action.payload },
			}

		case TYPES.NOTES_LOAD_ENTRIES:
			return {
				...state,
				notes: [...action.payload],
			}

		case TYPES.NOTES_UPDATED:
			return {
				...state,
				notes: state.notes.map((note) =>
					note.id === action.payload.id ? action.payload.note : note
				),
			}
		case TYPES.NOTES_DELETE:
			return {
				...state,
				active: null,
				notes: state.notes.filter((note) => note.id !== action.payload),
			}
		case TYPES.NOTES_LOGOUT_CLEAN:
			return initialState

		default:
			return state
	}
}
