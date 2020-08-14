import React from 'react'
import Login from 'pages/Login'
import { screen, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import LoginForm from 'components/LoginForm'
import * as authActions from 'store/actions/auth'
const googleSingIn = jest.spyOn(authActions, 'googleSingIn')
const loginAsync = jest.spyOn(authActions, 'loginAsync')
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
store.dispatch = jest.fn(() => {})
const mockOnSubmit = jest.fn()
describe('tests for login<>', () => {
	beforeEach(() => {
		store = mockStore(initialState)
	})

	test('should render correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</Provider>
		)
		const [title] = screen.getAllByText(/Login/)
		expect(title).toBeInTheDocument()
	})
	test('should call login', async () => {
		const email = 'shouldwork@work.com'
		const password = 'abc123asd'

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginForm onSubmit={mockOnSubmit} />
				</MemoryRouter>
			</Provider>
		)
		const inputEmail = screen.getByPlaceholderText(/Email/)
		const inputPassword = screen.getByPlaceholderText(/Password/)
		const buttonLogin = screen.getByRole('button')
		await act(async () => {
			userEvent.type(inputEmail, email)
			userEvent.type(inputPassword, password)
			userEvent.click(buttonLogin)
		})
		expect(mockOnSubmit).toBeCalled()
	})
	test('should call googleSignIn', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginForm onSubmit={mockOnSubmit} />
				</MemoryRouter>
			</Provider>
		)
		const googleSignIn = screen.getByLabelText('googleButton')
		userEvent.click(googleSignIn)
		expect(googleSingIn).toBeCalled()
	})
})
