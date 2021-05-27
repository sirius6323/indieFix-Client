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
			<Form.Group controlId='formUsername' className='mb-3'>
				<Form.Label className='login-input'>Username:</Form.Label>
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
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Row>
				<Button variant='primary' type='submit' onClick={handleSubmit}>
					Submit
				</Button>
				<Button type='secondary' onClick={props.toggleRegister}>
					Register
				</Button>
			</Row>
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
