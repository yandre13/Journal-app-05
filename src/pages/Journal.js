import React from 'react'
import Sidebar from 'components/Sidebar'
import Note from '../components/Note'
import { useSelector } from 'react-redux'
import NoSelected from 'components/NoSelected'
//import NoSelected from 'components/NoSelected'

const Journal = () => {
	const { active } = useSelector((state) => state.notes)
	return (
		<div className="journal__main-content">
			<Sidebar />
			<main>{active ? <Note /> : <NoSelected />}</main>
		</div>
	)
}

export default Journal
