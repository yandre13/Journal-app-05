import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { googleSingIn, loginAsync } from 'store/actions/auth'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import { startLoading } from 'store/actions/ui'

const schema = yup.object().shape({
	email: yup.string().required().email().min(6),
	password: yup.string().required().min(8),
})

const LoginForm = () => {
	const { register, errors, handleSubmit } = useForm({
		defaultValues: {
			email: 'kyomi@beta.pe',
			password: 'paolin1234',
		},
		resolver: yupResolver(schema),
	})
	const dispatch = useDispatch()
	const { loading } = useSelector((state) => state.ui)
	const onSubmit = (data) => {
		const { email, password } = data
		dispatch(startLoading())
		dispatch(loginAsync(email, password))
	}

	const handleGoogleSignIn = () => {
		dispatch(googleSingIn())
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				className="auth__input my-2"
				name="email"
				type="text"
				placeholder="Email"
				ref={register}
			/>
			<p>{errors.email?.message}</p>
			<input
				className="auth__input"
				name="password"
				type="password"
				placeholder="Password"
				ref={register}
			/>
			<p>{errors.password?.message}</p>
			<button
				disabled={loading}
				className="btn btn-primary btn-block my-2"
				type="submit"
			>
				Login
			</button>

			<div className="auth__social-networks">
				<p>Login with social networks</p>
				<div className="google-btn" onClick={handleGoogleSignIn}>
					<div className="google-icon-wrapper">
						<img
							className="google-icon"
							src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
							alt="google button"
						/>
					</div>
					<p className="btn-text">
						<b>Sign in with google</b>
					</p>
				</div>
			</div>
			<Link to="auth/register">Create a new account</Link>
		</form>
	)
}

export default LoginForm
