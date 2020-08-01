import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NotesBar from 'components/NotesBar'
import { useForm } from 'react-hook-form'
import { activeNote, startDeleting } from 'store/actions/notes'

const Note = () => {
	const { active } = useSelector((state) => state.notes)
	const dispatch = useDispatch()
	const { register, getValues, reset } = useForm({
		defaultValues: { ...active },
	})
	const onChange = () => {
		const values = getValues()
		dispatch(activeNote(active.id, { ...values, date: active.date }))
	}
	const handleDelete = () => {
		dispatch(startDeleting(active.id))
	}

	useEffect(() => {
		reset(active)
	}, [active])

	return (
		<div className="notes__main-content">
			<NotesBar />
			<form>
				<div className="notes__content">
					<input
						name="title"
						type="text"
						placeholder="Write an awesome title"
						className="notes__title-input"
						ref={register}
						onChange={onChange}
					/>
					<textarea
						name="body"
						placeholder="what happened today?"
						className="notes__textarea"
						ref={register}
						onChange={onChange}
					></textarea>
					{active.url && (
						<div className="notes__image">
							<img
								src="https://blogdesuperheroes.es/wp-content/plugins/BdSGallery/BdSGaleria/93835.jpg"
								alt="some img"
							/>
						</div>
					)}
				</div>
			</form>
			<button className="btn btn-danger" onClick={handleDelete}>
				Delete
			</button>
		</div>
	)
}

export default Note
