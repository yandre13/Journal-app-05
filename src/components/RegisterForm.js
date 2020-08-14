import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

const initialValues = {
	name: '',
	email: '',
	password: '',
	password2: '',
}

const schema = yup.object().shape({
	name: yup.string().required().min(2),
	email: yup.string().required().email().min(6),
	password: yup.string().required().min(8),
	password2: yup
		.string()
		.required()
		.oneOf([yup.ref('password')]),
})

const RegisterForm = ({ onSubmit }) => {
	const { handleSubmit, errors, register } = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				className="auth__input my-2"
				name="name"
				type="text"
				ref={register}
				placeholder="Name"
				autoComplete="off"
			/>
			<p>{errors.name?.message}</p>
			<input
				className="auth__input"
				name="email"
				type="text"
				ref={register}
				placeholder="Email"
				autoComplete="off"
			/>
			<p>{errors.email?.message}</p>
			<input
				className="auth__input my-2"
				name="password"
				type="password"
				ref={register}
				placeholder="Password"
			/>
			<p>{errors.password?.message}</p>
			<input
				className="auth__input"
				name="password2"
				type="password"
				ref={register}
				placeholder="Confirm password"
			/>
			<p>{errors.password2?.message}</p>
			<button className="btn btn-primary btn-block my-2" type="submit">
				Register
			</button>

			<div className="auth__social-networks">
				<p>Login with social networks</p>
				<div className="google-btn">
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
			<Link to="auth/login">Already registered?</Link>
		</form>
	)
}

export default RegisterForm
