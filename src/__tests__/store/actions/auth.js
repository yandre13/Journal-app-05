import React from 'react'
import { login, logout } from 'store/actions/auth'
import { TYPES } from 'store/types'

describe('tests in auth actions', () => {
	test('should return the right actions (login && logout)', () => {
		const loginAction = login(123, 'foo')
		const logoutAction = logout()
		expect(loginAction).toEqual({
			type: TYPES.AUTH_LOGIN,
			payload: { uid: 123, displayName: 'foo' },
		})
		expect(logoutAction).toEqual({ type: TYPES.AUTH_LOGOUT })
	})
})
