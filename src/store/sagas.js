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

//Auth
function* genLogin(email, password) {
	try {
		const { user } = yield call(
			[auth, auth.signInWithEmailAndPassword],
			email,
			password
		)
		yield put(login(user.uid, user.displayName))
		yield put(finishLoading())
	} catch (e) {
		console.log(e)
		yield put(finishLoading())
		Swal.fire('error', e.message, 'error')
	}
}
function* sagaLogin() {
	const {
		payload: { email, password },
	} = yield take(TYPES.AUTH_LOGIN_ASYNC)
	yield call(genLogin, email, password)
}
function* genGoogleAuth() {
	try {
		const { user } = yield call([auth, auth.signInWithPopup], authProvider)
		console.log(user)
		yield put(login(user.uid, user.displayName))
	} catch (e) {
		console.log(e)
		Swal.fire('error', e.message, 'error')
	}
}
function* sagaGoogleAuth() {
	yield takeEvery(TYPES.AUTH_GOOGLE_SIGN_IN, genGoogleAuth)
}
function* genRegister(name, email, password) {
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
function* sagaRegister() {
	const {
		payload: { name, email, password },
	} = yield take(TYPES.AUTH_REGISTER)
	yield call(genRegister, name, email, password)
}
function* genLogout() {
	try {
		const res = yield call([auth, auth.signOut])
		console.log(res)
		yield put(logout())
		yield put(notesLogout())
	} catch (e) {
		console.log(e)
	}
}
function* sagaLogout() {
	yield takeEvery(TYPES.AUTH_LOGOUT_ASYNC, genLogout)
}
//

//Notes

function* genStartAddEntry() {
	const { uid } = yield select((state) => state.auth)
	const newEntry = {
		title: '',
		body: '',
		date: new Date().getTime(),
	}

	const doc = yield db.collection(`${uid}/journal/notes`).add(newEntry)
	console.log(doc)
	yield put(activeNote(doc.id, newEntry))
	yield put(addEntry(doc.id, newEntry))
}

function* sagaAddEntry() {
	yield takeEvery(TYPES.NOTES_START_ADD_ENTRY, genStartAddEntry)
}

function* genLoadingEntries() {
	const { uid } = yield select((state) => state.auth)
	const notes = yield call(loadNotes, uid)
	yield put(setNotes(notes))
}
function* sagaLoadingEntries() {
	yield takeEvery(TYPES.NOTES_START_LOADING_ENTRIES, genLoadingEntries)
}

function* genSaveNote(note) {
	try {
		const { uid } = yield select((state) => state.auth)

		if (!note.url) {
			delete note.url
		}

		const noteToFirestore = { ...note }
		delete noteToFirestore.id
		yield db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
		yield put(refreshNote(note.id, noteToFirestore))
		Swal.fire('Saved', note.title, 'success')
	} catch (e) {
		console.log(e)
		Swal.fire('error', e.message, 'error')
	}
}

function* sagaSaveNote() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_UPDATING)

		yield call(genSaveNote, payload)
	}
}

function* genUploadPicture(file) {
	try {
		const { active } = yield select((state) => state.notes)
		Swal.fire({
			title: 'Loading...',
			text: 'please wait',
			allowOutsideClick: false,
			onBeforeOpen: () => Swal.showLoading(),
		})
		const url = yield call(fileUpload, file)
		active.url = url
		yield put(startSaveNote(active))
	} catch (e) {
		console.log(e)
	}
}

function* sagaUploadPicture() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_UPLOADING_IMG)
		yield call(genUploadPicture, payload)
	}
}

function* genStartDeleting(id) {
	try {
		const { uid } = yield select((state) => state.auth)
		yield db.doc(`${uid}/journal/notes/${id}`).delete()
		yield put(deleteNote(id))
	} catch (e) {
		console.log(e)
	}
}

function* sagaStartDeleting() {
	while (true) {
		const { payload } = yield take(TYPES.NOTES_START_DELETING)
		yield call(genStartDeleting, payload)
	}
}

export function* rootSaga() {
	yield all([
		fork(sagaLogin),
		fork(sagaGoogleAuth),
		fork(sagaRegister),
		fork(sagaLogout),
		//
		fork(sagaAddEntry),
		fork(sagaLoadingEntries),
		fork(sagaSaveNote),
		fork(sagaUploadPicture),
		fork(sagaStartDeleting),
	])
}
