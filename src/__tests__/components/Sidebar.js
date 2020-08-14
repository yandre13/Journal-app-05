import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import Sidebar from 'components/Sidebar'
import configureStore from 'redux-mock-store'
import * as authActions from 'store/actions/auth'
import userEvent from '@testing-library/user-event'
import * as notesActions from 'store/actions/notes'
import { createEntry } from 'helpers/createEntry'

const logoutAsync = jest.spyOn(authActions, 'logoutAsync')
const startAddEntry = jest.spyOn(notesActions, 'startAddEntry')
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

describe('tests for Sidebar', () => {
	test('should render correctly', () => {
		render(
			<Provider store={store}>
				<Sidebar />
			</Provider>
		)
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	test('should call logout', async () => {
		render(
			<Provider store={store}>
				<Sidebar />
			</Provider>
		)
		const buttonLogout = screen.getByRole('button')
		await act(async () => userEvent.click(buttonLogout))
		expect(logoutAsync).toBeCalled()
	})

	test('should call startAddEntry', async () => {
		render(
			<Provider store={store}>
				<Sidebar />
			</Provider>
		)
		const newEntry = screen.getByLabelText('new entry')
		await act(async () => userEvent.click(newEntry))
		expect(startAddEntry).toHaveBeenCalledWith(createEntry())
	})
})
