import { authReducer } from 'store/reducers/auth'
import { TYPES } from 'store/types'

describe('tests in authReducer', () => {
	const initialState = {}
	test('should return initialState', () => {
		const state = authReducer(initialState, {})
		expect(state).toEqual(initialState)
	})

	test('should return login state', () => {
		const action = {
			type: TYPES.AUTH_LOGIN,
			payload: { uid: '123', displayName: 'kyomi' },
		}
		const state = authReducer(initialState, action)
		expect(state).toHaveProperty('uid')
		expect(state).toHaveProperty('name')
	})

	test('should return an empty object because of logout', () => {
		const action = { type: TYPES.AUTH_LOGOUT }
		const state = authReducer(initialState, action)
		expect(state).toEqual({})
	})
})
