import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(firstName, lastName, birthday, username, email);
		props.onRegister(username);
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
							<Form.Group controlId='registerFirstName' className='mb-3'>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									value={firstName}
									placeholder='First Name'
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='registerLastName' className='mb-3'>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									value={lastName}
									placeholder='Last Name'
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId='registerBirthday' className='mb-3'>
								<Form.Label>Birthday</Form.Label>
								<Form.Control
									type='text'
									value={birthday}
									placeholder='MM/DD/YY'
									onChange={(e) => setBirthday(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='registerUserName' className='mb-3'>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type='text'
									value={username}
									placeholder='Username'
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId='registerPassword' className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='text'
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
							<Form.Group controlId='registerEmail' className='mb-3'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='text'
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
							variant='info primary'
							type='submit'
							size='sm'
							onClick={handleSubmit}
							block
						>
							Submit
						</Button>
						<Button
							variant='danger primary'
							type='secondary'
							size='sm'
							block
							onClick={() => {
								onBackClick(null);
							}}
						>
							Back
						</Button>
					</div>
				</Form>
			</div>
		</Container>
	);
}

RegistrationView.propTypes = {
	onRegister: PropTypes.func.isRequired,
};
