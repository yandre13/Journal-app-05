import React from 'react'
import JournalEntries from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync } from 'store/actions/auth'
import { startAddEntry } from 'store/actions/notes'
import { createEntry } from 'helpers/createEntry'

const Sidebar = () => {
	const dispatch = useDispatch()
	const { name } = useSelector((state) => state.auth)
	const handleLogout = () => {
		dispatch(logoutAsync())
	}
	const handleAddEntry = () => {
		dispatch(startAddEntry(createEntry()))
	}

	return (
		<aside className="journal__sidebar">
			<div className="journal__sidebar-navbar">
				<h3 className="mt-5">
					<i className="far fa-moon"></i>
					<span>{name}</span>
				</h3>
				<button className="btn" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div
				aria-label="new entry"
				className="journal__new-entry"
				onClick={handleAddEntry}
			>
				<i className="far fa-calendar-plus fa-5x"></i>
				<p className="mt-5">New entry</p>
			</div>
			<JournalEntries />
		</aside>
	)
}

export default Sidebar
