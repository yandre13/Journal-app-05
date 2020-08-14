import React from 'react'
import { render, act } from '@testing-library/react'
import AppRouter from 'routers/AppRouter'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { firebase } from 'firebase/config'
import * as authActions from 'store/actions/auth'

const login = jest.spyOn(authActions, 'login')
const initialState = {
	auth: {},
	notes: {
		notes: [],
		active: null,
	},
	ui: {
		loading: false,
		messageError: '',
	},
}
const mockStore = configureStore([])
let store = mockStore(initialState)
let user
describe('tests for AppRouter <>', () => {
	test('should call login if I am authenticated', async () => {
		const email = 'should@work.com'
		const password = 'workworkwork'
		await act(async () => {
			const userCred = firebase.auth().signInWithEmailAndPassword(email, password)
			user = (await userCred).user
			render(
				<Provider store={store}>
					<AppRouter />
				</Provider>
			)
		})
		expect(login).toHaveBeenCalledWith(user.uid, user.displayName)
	})
})
