import React from 'react'
import RegisterForm from 'components/RegisterForm'
import { useDispatch } from 'react-redux'
import { registerEmail } from 'store/actions/auth'
const Register = () => {
	const dispatch = useDispatch()
	const onSubmit = (data) => {
		const { name, email, password } = data
		dispatch(registerEmail(name, email, password))
	}
	return (
		<>
			<h3 className="auth__title">Register</h3>
			<RegisterForm onSubmit={onSubmit} />
		</>
	)
}

export default Register
