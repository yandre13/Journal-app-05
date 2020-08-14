import React from 'react'
import Register from 'pages/Register'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import RegisterForm from 'components/RegisterForm'
import userEvent from '@testing-library/user-event'

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
//bin
const mockOnSubmit = jest.fn()

describe('tests for Register<>', () => {
	beforeEach(() => (store = mockStore(initialState)))
	test('should render correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Register />
				</MemoryRouter>
			</Provider>
		)
		const button = screen.getByRole('button', { name: 'Register' })
		expect(button).toBeInTheDocument()
	})

	test('should call onSubmit', async () => {
		const [name, email, password] = [
			'Juan',
			'peruanito12@gmail.com',
			'password1234',
		]
		render(
			<Provider store={store}>
				<MemoryRouter>
					<RegisterForm onSubmit={mockOnSubmit} />
				</MemoryRouter>
			</Provider>
		)
		const [inputName, inputEmail] = screen.getAllByRole('textbox')
		const [inputPassword, inputPassword2] = screen.getAllByPlaceholderText(
			/password/i
		)
		const buttonRegister = screen.getByRole('button', { name: 'Register' })

		await act(async () => {
			userEvent.type(inputName, name)
			userEvent.type(inputEmail, email)
			userEvent.type(inputPassword, password)
			userEvent.type(inputPassword2, password)
			userEvent.click(buttonRegister)
		})

		expect(mockOnSubmit).toBeCalled()
	})

	test('should show errors', async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Register />
				</MemoryRouter>
			</Provider>
		)
		const buttonRegister = screen.getByRole('button', { name: 'Register' })
		await act(async () => userEvent.click(buttonRegister))
		expect(screen.getByText('name is a required field')).toBeInTheDocument()
	})
})
