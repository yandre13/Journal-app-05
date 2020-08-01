import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { activeNote } from 'store/actions/notes'

const JournalEntry = ({ id, title, date, body, url }) => {
	const dispatch = useDispatch()
	const noteDate = moment(date)
	const handleClickEntry = () => {
		const note = { title, date, body, url }
		dispatch(activeNote(id, note))
	}
	return (
		<div className="journal___entry pointer" onClick={handleClickEntry}>
			{url && (
				<div
					className="journal___entry-picture"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url(${url})`,
					}}
				></div>
			)}
			<div className="journal___entry-body">
				<p className="journal___entry-title">{title}</p>
				<p className="journal___entry-content">{body}</p>
			</div>
			<div className="journal___entry-date-box">
				<span>{noteDate.format('dddd')}</span>
				<h4>{noteDate.format('Do')}</h4>
			</div>
		</div>
	)
}

export default JournalEntry
