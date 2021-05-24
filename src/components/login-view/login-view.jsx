import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Sends a request to the server for authentication 
			 the call props.onLoggedIn(username) */
		props.onLoggedIn(username);
	};

	return (
		<>
			<form className='login-form'>
				<label className='login-input'>
					Username:
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label className='login-input'>
					Password:
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<span>
					<button type='submit' onClick={handleSubmit}>
						Submit
					</button>
					<button type='secondary' onClick={props.toggleRegister}>
						Register
					</button>
				</span>
			</form>
		</>
	);
}

export function Button({ label }) {
	return <button className='login-button'>{label}</button>;
}

LoginView.PropTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
	onRegister: PropTypes.func,
};
