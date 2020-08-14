import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Note from 'components/Note'
import * as notesActions from 'store/actions/notes'
import userEvent from '@testing-library/user-event'

const activeNote = jest.spyOn(notesActions, 'activeNote')
const initialState = {
	auth: {},
	notes: {
		notes: [],
		active: {},
	},
	ui: {
		loading: false,
		messageError: '',
	},
}
const mockStore = configureStore([])
let store = mockStore(initialState)
describe('tests for Note <>', () => {
	test('should render correctly', () => {
		render(
			<Provider store={store}>
				<Note />
			</Provider>
		)
		const buttonSave = screen.getByRole('button', { name: 'Save' })
		expect(buttonSave).toBeInTheDocument()
	})

	test('should call activeNote', async () => {
		const placeholder = 'Write an awesome title'
		const text = 'Hi'
		render(
			<Provider store={store}>
				<Note />
			</Provider>
		)
		const inputTitle = screen.getByPlaceholderText(placeholder)
		await act(async () => userEvent.type(inputTitle, text))
		expect(activeNote).toHaveBeenCalledTimes(text.length)
	})
})
