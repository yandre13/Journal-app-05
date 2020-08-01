import { TYPES } from 'store/types'

/*
{
 uid: 12,
 name: 'Kyomi'
} 
 */

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case TYPES.AUTH_LOGIN:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName,
			}
		case TYPES.AUTH_LOGOUT:
			return {}
		default:
			return state
	}
}
