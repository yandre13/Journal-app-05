import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import JournalEntry from 'components/JournalEntry'
import * as notesActions from 'store/actions/notes'
import userEvent from '@testing-library/user-event'

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]
const day = new Date()
const dayName = days[day.getDay()]

const mockStore = configureStore([])
const store = mockStore({})

const activeNote = jest.spyOn(notesActions, 'activeNote')

describe('tests for JournalEntry <>', () => {
	test('should render correctly', () => {
		render(
			<Provider store={store}>
				<JournalEntry />
			</Provider>
		)
		const dayTest = screen.getByText(dayName)
		expect(dayTest).toBeInTheDocument()
	})

	test('should call activeNote', async () => {
		const note = {
			id: 123,
			title: 'Hello',
			date: day,
			body: 'World',
			url: undefined,
		}
		const noteTest = {
			title: 'Hello',
			date: day,
			body: 'World',
			url: undefined,
		}
		render(
			<Provider store={store}>
				<JournalEntry {...note} />
			</Provider>
		)

		const journalNote = screen.getByLabelText('journal entry')
		await act(async () => userEvent.click(journalNote))
		expect(activeNote).toHaveBeenCalledWith(note.id, noteTest)
	})
})
