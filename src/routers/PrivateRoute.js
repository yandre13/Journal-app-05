import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ path, isLoggedIn, component: Component }) => {
	return (
		<Route
			path={path}
			component={() =>
				!isLoggedIn ? <Redirect to="/auth/login" /> : <Component />
			}
		/>
	)
}

export default PrivateRoute
