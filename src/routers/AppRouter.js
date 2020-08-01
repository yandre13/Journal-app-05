import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import Journal from 'pages/Journal'
import { firebase } from 'firebase/config'
import { useDispatch } from 'react-redux'
import { login } from 'store/actions/auth'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { startLoadingNotes } from 'store/actions/notes'

const AppRouter = () => {
	const dispatch = useDispatch()
	const [checking, setChecking] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName))
				setIsLoggedIn(true)
				dispatch(startLoadingNotes())
			} else {
				setIsLoggedIn(false)
			}
			setChecking(false)
		})
	}, [dispatch])

	return (
		<>
			{checking ? (
				<h2>Loading...</h2>
			) : (
				<div>
					<Router>
						<div>
							<Switch>
								<PrivateRoute
									path="/"
									exact
									isLoggedIn={isLoggedIn}
									component={Journal}
								/>
								<PublicRoute
									path="/auth"
									isLoggedIn={isLoggedIn}
									component={AuthRouter}
								/>
								<Redirect to="/auth/login" />
							</Switch>
						</div>
					</Router>
				</div>
			)}
		</>
	)
}

export default AppRouter
