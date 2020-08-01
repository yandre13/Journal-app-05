import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadingPicture } from 'store/actions/notes'

const NotesBar = () => {
	const dispatch = useDispatch()
	const { active } = useSelector((state) => state.notes)
	const ref = useRef()
	const handleSave = () => {
		dispatch(startSaveNote(active))
	}
	const handlePicture = () => {
		ref.current.click()
	}
	const handleFile = (e) => {
		const [file] = e.target.files
		if (file) {
			dispatch(startUploadingPicture(file))
		}
	}

	return (
		<div className="notes__bar">
			<span>28 de agosto 2020</span>
			<input
				ref={ref}
				type="file"
				style={{ display: 'none' }}
				onChange={handleFile}
			/>
			<div>
				<button className="btn" onClick={handlePicture}>
					picture
				</button>
				<button className="btn" onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	)
}

export default NotesBar
