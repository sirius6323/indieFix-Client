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
		<Form>
			<Form.Group controlId='formUsername' className='login-form'>
				<Form.Label className='login-input'>Username:</Form.Label>
				<Form.Control
					type='text'
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId='formPassword'>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Button variant='primary' type='submit' onClick={handleSubmit}>
				Submit
			</Button>
			<Button type='secondary' onClick={props.toggleRegister}>
				Register
			</Button>
		</Form>
	);
}

export function Button({ label }) {
	return <button className='login-button'>{label}</button>;
}

LoginView.propTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
	onRegister: PropTypes.func,
};
