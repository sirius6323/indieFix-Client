import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
			<h3>Login</h3>
			<Form.Group controlId='formUsername' className='mb-3'>
				<Form.Label className='login-input'>Username</Form.Label>
				<Form.Control
					size='md'
					type='text'
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Enter Username'
				/>
				<Form.Text className='text-muted'>
					We'll never share your user account info with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					size='md'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter Password'
				/>
				<Form.Text className='text-muted'>
					Your password requires a minimum of 8 characters.
				</Form.Text>
			</Form.Group>
			<div className='d-grid gap-2'>
				<Button
					variant='primary'
					type='submit'
					size='lg'
					onClick={handleSubmit}
				>
					Submit
				</Button>
				<Button type='secondary' size='lg' onClick={props.toggleRegister}>
					Register
				</Button>
			</div>
		</Form>
	);
}

/* export function Button({ label }) {
	return <Button className='login-button'>{label}</Button>;
} */

LoginView.propTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
	onRegister: PropTypes.func,
};
