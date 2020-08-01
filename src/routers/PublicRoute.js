import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ path, isLoggedIn, component: Component }) => {
	return (
		<Route
			path={path}
			component={() => (isLoggedIn ? <Redirect to="/" /> : <Component />)}
		/>
	)
}

export default PublicRoute
