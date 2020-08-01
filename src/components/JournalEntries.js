import React from 'react'
import JournalEntry from './JournalEntry'
import { useSelector } from 'react-redux'

const JournalEntries = () => {
	const { notes } = useSelector((state) => state.notes)

	return (
		<div className="journal__entries">
			{notes.map(({ id, title, date, body, url }) => (
				<JournalEntry
					key={id}
					id={id}
					title={title}
					date={date}
					body={body}
					url={url}
				/>
			))}
		</div>
	)
}

export default JournalEntries
