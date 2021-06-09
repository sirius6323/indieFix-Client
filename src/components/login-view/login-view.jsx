import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		/* Sends a request to the server for authentication */
		axios
			.post('https://indiefix.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then((response) => {
				const data = response.data;
				props.onLoggedIn(data);
			})
			.catch((e) => {
				console.log('User does not exist');
			});
	};

	return (
		<Container>
			<div className='d-flex align-items-center justify-content-center'>
				<Form className='custom-form'>
					<h3 className='d-flex mb-3 text-align-center justify-content-center font-weight-bold login-title'>
						Login to indieFix
					</h3>
					<Form.Group controlId='formUsername' className='mb-3'>
						<Form.Label>Username</Form.Label>
						<Form.Control
							size='md'
							type='text'
							placeholder='Enter Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Form.Text className='text-muted'>
							We'll never share your user account info with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId='formPassword' className='mb-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							size='md'
							type='password'
							placeholder='Enter Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<div className='d-grid gap-2 custom-button'>
						<Button
							variant='info primary'
							type='submit'
							size='sm'
							onClick={handleSubmit}
							block
						>
							Submit
						</Button>
						<Button
							variant='danger'
							type='secondary'
							size='sm'
							onClick={props.toggleRegister}
							block
						>
							Register
						</Button>
					</div>
				</Form>
			</div>
		</Container>
	);
}

LoginView.propTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
	onRegister: PropTypes.func,
};
