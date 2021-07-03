import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// React-Bootstrap Components
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

// Router
import { Link } from 'react-router-dom';

// Styles
import './registration-view.scss';

export function RegistrationView(props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	// States for validation
	const [validateFirstName, setValidateFirstName] = useState('');
	const [validateLastName, setValidateLastName] = useState('');
	const [validateBirthday, setValidateBirthday] = useState('');
	const [validateUsername, setValidateUsername] = useState('');
	const [validatePassword, setValidatePassword] = useState('');
	const [validateEmail, setValidateEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('https://indiefix.herokuapp.com/users', {
				FirstName: firstName,
				LastName: lastName,
				Birthday: birthday,
				Username: username,
				Password: password,
				Email: email,
			})
			.then((response) => {
				const data = response.data;
				console.log(data);
				props.onRegister(data);
				// _self argument is necessary so that the page will open in the current tab
				window.open('/', '_self');
			})
			.catch((e) => {
				console.log('Error registering the user');
			});
	};

	return (
		<Container>
			<div className='d flex align-items-center justify-content-center'>
				<Form className='custom-form'>
					<h3 className='d-flex mb-3 text-align-center justify-content-center font-weight-bold register'>
						Register to indieFix
					</h3>
					<Row>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='FirstName'>First Name</Form.Label>
								<Form.Control
									type='text'
									name='FirstName'
									value={firstName}
									placeholder='First Name'
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='LastName'>Last Name</Form.Label>
								<Form.Control
									type='text'
									name='LastName'
									value={lastName}
									placeholder='Last Name'
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='Birthday'>Birthday</Form.Label>
								<Form.Control
									type='text'
									name='Birthday'
									value={birthday}
									placeholder='MM/DD/YY'
									onChange={(e) => setBirthday(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='Username'>Username</Form.Label>
								<Form.Control
									type='text'
									name='Username'
									value={username}
									placeholder='Username'
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='Password'>Password</Form.Label>
								<Form.Control
									type='text'
									name='Password'
									value={password}
									placeholder='Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Form.Text className='text-muted'>
									Your password requires a minimum of 8 characters.
								</Form.Text>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='Email'>Email</Form.Label>
								<Form.Control
									type='text'
									name='Email'
									value={email}
									placeholder='Email'
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Form.Text className='text-muted'>
									Your email must be a valid email address.
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>
					<div className='d-grid gap-2 custom-button'>
						<Button
							className='mb-3'
							variant='info primary'
							type='submit'
							size='sm'
							onClick={handleSubmit}
							block
						>
							Submit
						</Button>
						<Link to='/'>
							<Button variant='danger' type='secondary link' size='md' block>
								Back To Log In
							</Button>
						</Link>
					</div>
				</Form>
			</div>
		</Container>
	);
}
