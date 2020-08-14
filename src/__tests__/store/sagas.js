import {
	sagaStartAddEntry,
	sagaLoadingEntries,
	sagaSaveNote,
	sagaUploadPicture,
	sagaLogin,
	sagaLogout,
	authSelector,
	notesSelector,
} from 'store/sagas'
import { db, firebase } from 'firebase/config'
import {
	activeNote,
	addEntry,
	refreshNote,
	startSaveNote,
	notesLogout,
} from 'store/actions/notes'
import sagaHelper from 'redux-saga-testing'
import { call, put, select } from 'redux-saga/effects'
import { createEntry } from 'helpers/createEntry'
import loadNotes from 'helpers/loadNotes'
import { setNotes } from 'store/actions/notes'
import { fileUpload } from 'helpers/fileUpload'
import { login, logout } from 'store/actions/auth'
import { finishLoading } from 'store/actions/ui'

const initialState = { uid: 'TESTING' }
const collection = jest
	.spyOn(db, 'collection')
	.mockReturnValue({ add: jest.fn() })

const doc = jest.spyOn(db, 'doc').mockReturnValue({ update: jest.fn() })

const auth = jest.spyOn(firebase, 'auth')
//notes
describe('tests for sagaStartAddEntry', () => {
	const collectionRef = collection()
	const newEntry = createEntry()
	const it = sagaHelper(sagaStartAddEntry(newEntry))

	it('should get auth from the state', (result) => {
		expect(result).toEqual(select(authSelector))
		return initialState
	})
	it('should have called the mock API first, which we are going to specify the results of', (result) => {
		expect(result).toEqual(call([collectionRef, collectionRef.add], newEntry))

		return { id: 1, ...newEntry }
	})

	it('and then set active note', (result) => {
		expect(result).toEqual(put(activeNote(1, newEntry)))
	})
	it('and then add new entry with the others', (result) => {
		expect(result).toEqual(put(addEntry(1, newEntry)))
	})

	it('and then nothing', (result) => {
		expect(result).toBeUndefined()
	})
})

describe('testsfor sagaLoadingEntries', () => {
	const it = sagaHelper(sagaLoadingEntries())
	const notes = [{ id: 1, title: '', body: '' }]
	it('should select uid', (result) => {
		expect(result).toEqual(select(authSelector))
		return initialState
	})
	it('should call loadNotes', (result) => {
		expect(result).toEqual(call(loadNotes, initialState.uid))
		return notes
	})
	it('should put setNotes', (result) => {
		expect(result).toEqual(put(setNotes(notes)))
	})
	it('and then nothing', (result) => {
		expect(result).toBeUndefined()
	})
})

describe('tests for sagaSaveNote', () => {
	const note = { id: 1, title: '', body: '' }
	const noteToFirestore = { title: '', body: '' }
	const docRef = doc()
	const it = sagaHelper(sagaSaveNote(note))

	it('should select uid', (result) => {
		expect(result).toEqual(select(authSelector))
		return initialState
	})
	it('should have called the mock API update', (result) => {
		expect(result).toEqual(call([docRef, docRef.update], noteToFirestore))
	})
	it('should put refreshNote', (result) => {
		expect(result).toEqual(put(refreshNote(note.id, note)))
	})
	it('should be undefined', (result) => {
		expect(result).toBeUndefined()
	})
})

describe('tests for sagaUploadPicture', () => {
	const active = { id: 1, title: '', body: '' }
	const file = 'img'
	const it = sagaHelper(sagaUploadPicture(file))

	it('shoud select active from notesSelector', (result) => {
		expect(result).toEqual(select(notesSelector))
		return { active }
	})
	it('should call fileUpload', (result) => {
		expect(result).toEqual(call(fileUpload, file))
		return 'https://img123.com'
	})
	it('should put startSaveNote', (result) => {
		expect(result).toEqual(put(startSaveNote(active)))
	})
	it('and then nothing', (result) => {
		expect(result).toBeUndefined()
	})
})

//auth
describe('tests for sagaLogin', () => {
	const email = 'should@work.com'
	const password = '1'
	const user = { user: { uid: 123, displayName: 'bar' } }
	const it = sagaHelper(sagaLogin(email, password))
	const authRef = auth()

	it('should call signInWithEmailAndPassword', (result) => {
		expect(result).toEqual(
			call([authRef, authRef.signInWithEmailAndPassword], email, password)
		)
		return user
	})
	it('should put login', (result) => {
		expect(result).toEqual(put(login(123, 'bar')))
	})
	it('should put finishLoading', (result) => {
		expect(result).toEqual(put(finishLoading()))
	})
	it('and then nothing', (result) => {
		expect(result).toBeUndefined()
	})
})

describe('tests for sagaLogout', () => {
	const it = sagaHelper(sagaLogout())
	const authRef = auth()
	it('should call auth.signOut', (result) => {
		expect(result).toEqual(call([authRef, authRef.signOut]))
	})
	it('should put logout', (result) => {
		expect(result).toEqual(put(logout()))
	})
	it('should put notesLogout (clean notes state)', (result) => {
		expect(result).toEqual(put(notesLogout()))
	})
	it('and then nothing', (result) => {
		expect(result).toBeUndefined()
	})
})
