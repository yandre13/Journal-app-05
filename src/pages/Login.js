import React from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from 'components/LoginForm'
import { startLoading } from 'store/actions/ui'
import { loginAsync } from 'store/actions/auth'
const Login = () => {
	const dispatch = useDispatch()
	const onSubmit = (data) => {
		console.log('ya')
		const { email, password } = data
		dispatch(startLoading())
		dispatch(loginAsync(email, password))
	}
	return (
		<>
			<h3 className="auth__title">Login</h3>
			<LoginForm onSubmit={onSubmit} />
		</>
	)
}

export default Login
