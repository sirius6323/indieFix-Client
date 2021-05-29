import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
		<Container>
			<div className='d-flex align-items-center justify-content-center customHeight'>
				<Form className='custom-form custom-box-shadow'>
					<h3 className='d-flex mb-3 text-align-center justify-content-center login-title'>
						Login to indieFix
					</h3>
					<Form.Group controlId='formUsername' className='mb-3'>
						<Form.Label className='form-text'>Username</Form.Label>
						<Form.Control
							size='md'
							type='text'
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Enter Username'
						/>
						<Form.Text className='text-muted form-text'>
							We'll never share your user account info with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId='formPassword' className='mb-3'>
						<Form.Label className='form-text'>Password</Form.Label>
						<Form.Control
							size='md'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Enter Password'
						/>
						<Form.Text className='text-muted form-text'>
							Your password requires a minimum of 8 characters.
						</Form.Text>
					</Form.Group>
					<div className='d-grid gap-2 button-height'>
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
							variant='dark'
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
