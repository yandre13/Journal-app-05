import {
	takeEvery,
	call,
	put,
	take,
	all,
	fork,
	select,
} from 'redux-saga/effects'
import { login, logout } from './actions/auth'
import { firebase, authProvider, db } from 'firebase/config'
import { TYPES } from './types'
import { finishLoading } from './actions/ui'
import Swal from 'sweetalert2'
import {
	activeNote,
	setNotes,
	refreshNote,
	startSaveNote,
	deleteNote,
	notesLogout,
	addEntry,
} from './actions/notes'
import loadNotes from 'helpers/loadNotes'
import { fileUpload } from 'helpers/fileUpload'

const auth = firebase.auth()

export const authSelector = (state) => state.auth
export const notesSelector = (state) => state.notes

//Auth
export function* sagaLogin(email, password) {
	try {
		const { user } = yield call(
			[auth, auth.signInWithEmailAndPassword],
			email,
			password
		)
		console.log(user)
		yield put(login(user.uid, user.displayName))
		yield put(finishLoading())
	} catch (e) {
		console.log(e)
		yield put(finishLoading())
		Swal.fire('error', e.message, 'error')
	}
}
export function* watcherLogin() {
	while (true) {
		const {
			payload: { email, password },
		} = yield take(TYPES.AUTH_LOGIN_ASYNC)
		yield call(sagaLogin, email, password)
	}
}
function* sagaGoogleAuth() {
	try {
		const { user } = yield call([auth, auth.signInWithPopup], authProvider)
		console.log(user)
		yield put(login(user.uid, user.displayName))
	} catch (e) {
		console.log(e)
		Swal.fire('error', e.message, 'error')
	}
}
function* watcherGoogleAuth() {
	yield takeEvery(TYPES.AUTH_GOOGLE_SIGN_IN, sagaGoogleAuth)
}
function* sagaRegister(name, email, password) {
	try {
		const { user } = yield call(
			[auth, auth.createUserWithEmailAndPassword],
			email,
			password
		)
		yield call([user, user.updateProfile], { displayName: name })
		yield put(login(user.uid, user.displayName))
	} catch (e) {
		console.log(e)
		Swal.fire('error', e.message, 'error')
	}
}
function* watcherRegister() {
	while (true) {
		const {
			payload: { name, email, password },
		} = yield take(TYPES.AUTH_REGISTER)
		yield call(sagaRegister, name, email, password)
	}
}
export function* sagaLogout() {
	try {
		const res = yield call([auth, auth.signOut])
		console.log(res)
		yield put(logout())
		yield put(notesLogout())
	} catch (e) {
		console.log(e)
	}
}
function* watcherLogout() {
	yield takeEvery(TYPES.AUTH_LOGOUT_ASYNC, sagaLogout)
}
//

//Notes

export function* sagaStartAddEntry(newEntry) {
	const { uid } = yield select(authSelector)
	console.log(uid)
	const path = `${uid}/journal/notes`
	const collectionRef = db.collection(path)
	const doc = yield call([collectionRef, collectionRef.add], newEntry)
	console.log(doc)
	yield put(activeNote(doc.id, newEntry))
	yield put(addEntry(doc.id, newEntry))
}

function* watcherAddEntry() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_ADD_ENTRY)
		yield call(sagaStartAddEntry, payload)
	}
}

export function* sagaLoadingEntries() {
	const { uid } = yield select(authSelector)

	const notes = yield call(loadNotes, uid)
	yield put(setNotes(notes))
}
function* watcherLoadingEntries() {
	yield takeEvery(TYPES.NOTES_START_LOADING_ENTRIES, sagaLoadingEntries)
}

export function* sagaSaveNote(note) {
	try {
		const { uid } = yield select(authSelector)

		if (!note.url) {
			delete note.url
		}

		const noteToFirestore = { ...note }
		delete noteToFirestore.id
		const docRef = db.doc(`${uid}/journal/notes/${note.id}`)
		yield call([docRef, docRef.update], noteToFirestore)
		yield put(refreshNote(note.id, noteToFirestore))
		Swal.fire('Saved', note.title, 'success')
	} catch (e) {
		console.log(e)
		Swal.fire('error', e.message, 'error')
	}
}

function* watcherSaveNote() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_UPDATING)
		yield call(sagaSaveNote, payload)
	}
}

export function* sagaUploadPicture(file) {
	try {
		const { active } = yield select(notesSelector)
		Swal.fire({
			title: 'Loading...',
			text: 'please wait',
			allowOutsideClick: false,
			onBeforeOpen: () => Swal.showLoading(),
		})
		console.log(active)
		const url = yield call(fileUpload, file)
		active.url = url
		console.log(active)
		yield put(startSaveNote(active))
	} catch (e) {
		console.log(e)
	}
}

function* watcherUploadPicture() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_UPLOADING_IMG)
		yield call(sagaUploadPicture, payload)
	}
}

function* sagaStartDeleting(id) {
	try {
		const { uid } = yield select(authSelector)
		yield db.doc(`${uid}/journal/notes/${id}`).delete()
		yield put(deleteNote(id))
	} catch (e) {
		console.log(e)
	}
}

function* watcherStartDeleting() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_DELETING)
		yield call(sagaStartDeleting, payload)
	}
}

export function* rootSaga() {
	yield all([
		fork(watcherLogin),
		fork(watcherGoogleAuth),
		fork(watcherRegister),
		fork(watcherLogout),
		//
		fork(watcherAddEntry),
		fork(watcherLoadingEntries),
		fork(watcherSaveNote),
		fork(watcherUploadPicture),
		fork(watcherStartDeleting),
	])
}
