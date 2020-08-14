import { TYPES } from 'store/types'

/**
 * @param {string | number} uid
 * @param {string} displayName
 * @returns {{type: string, payload: object}} action
 */
export const login = (uid, displayName) => ({
	type: TYPES.AUTH_LOGIN,
	payload: { uid, displayName },
})

export const loginAsync = (email, password) => ({
	type: TYPES.AUTH_LOGIN_ASYNC,
	payload: { email, password },
})
export const googleSingIn = () => ({ type: TYPES.AUTH_GOOGLE_SIGN_IN })

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{type: string, payload: object}} action
 */
export const registerEmail = (name, email, password) => ({
	type: TYPES.AUTH_REGISTER,
	payload: { name, email, password },
})

export const logout = () => ({ type: TYPES.AUTH_LOGOUT })
export const logoutAsync = () => ({ type: TYPES.AUTH_LOGOUT_ASYNC })
