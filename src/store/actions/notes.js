import { TYPES } from 'store/types'

export const startAddEntry = (entry) => ({
	type: TYPES.NOTES_START_ADD_ENTRY,
	payload: entry,
})

export const addEntry = (id, note) => ({
	type: TYPES.NOTES_ADD_ENTRY,
	payload: { id, ...note },
})

export const activeNote = (id, note) => ({
	type: TYPES.NOTES_SET_ACTIVE,
	payload: { id, ...note },
})

export const startLoadingNotes = () => ({
	type: TYPES.NOTES_START_LOADING_ENTRIES,
})

export const setNotes = (notes) => ({
	type: TYPES.NOTES_LOAD_ENTRIES,
	payload: notes,
})

export const startSaveNote = (note) => ({
	type: TYPES.NOTES_START_UPDATING,
	payload: note,
})

export const refreshNote = (id, note) => ({
	type: TYPES.NOTES_UPDATED,
	payload: { id, note: { id, ...note } },
})

export const startUploadingPicture = (file) => ({
	type: TYPES.NOTES_START_UPLOADING_IMG,
	payload: file,
})

export const startDeleting = (id) => ({
	type: TYPES.NOTES_START_DELETING,
	payload: id,
})

export const deleteNote = (id) => ({ type: TYPES.NOTES_DELETE, payload: id })

export const notesLogout = () => ({ type: TYPES.NOTES_LOGOUT_CLEAN })
