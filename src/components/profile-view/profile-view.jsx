import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';

export class ProfileView extends React.Component {
	render() {
		let { user, token, history, userData, onNewUser, onSignOut } = this.props;

		function updateInfo(token) {
			const userFirst = document.getElementById('firstName');
			const userLast = document.getElementById('lastName');
			const birthdayInput = document.getElementById('birthday');
			const userInput = document.getElementById('username');
			const passInput = document.getElementById('password');
			const passVerInput = document.getElementById('passwordVer');
			const emailInput = document.getElementById('email');

			if (userInput.value.length > 12) {
				const userErr = document.getElementById('user');
				return (userErr.innerText = 'Username can only be 12 characters');
			}

			const userNameChoice = userInput.value || UserData.Username;
			let passChoice = null;
			if (passInput.value == '') {
				passChoice = '';
			} else {
				passChoice = passInput.value;
			}
			const firstNameChoice = userFirst.value || UserData.FirstName;
			const lastNameChoice = userLast.value || UserData.LastName;
			const emailChoice = emailInput.value || UserData.Email;
			const birthdayChoice = birthdayInput.value || UserData.Birthday;

			if (passInput.value === passVerInput.value) {
				axios
					.put(
						`https://indiefix.herokuapp.com/users/${user}`,
						{
							FirstName: firstNameChoice,
							LastName: lastNameChoice,
							Username: userNameChoice,
							Password: passChoice,
							Email: emailChoice,
							Birthday: birthdayChoice,
						},
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then((response) => {
						console.log('Success with updating your account information');
						let userData2 = response.data;
						onNewUser(userData2);
						if (userInput.value != '') {
							window.location = `/users/${userData2.Username}`;
						}
						if (passChoice != '') {
							window.location = `/users/${userData2.Username}`;
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			} else {
				const passErr = document.getElementById('password');
				const passErrVer = document.getElementById('passwordVer');
				passErr.innerText = 'Your password must match';
				passErrVer.innerText = 'The passwords entered must match';
			}
		}

		function deleteAccount(token) {
			console.log('Your account is not deleted yet');
			axios
				.delete(`https://indiefix.herokuapp.com/users/${user}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response);
					console.log(`${user} has been deleted from the database`);
				})
				.catch((e) => {
					console.log('There was an error');
					console.log(e);
				});
		}

		function Date() {
			const formatDate = userData.Birthday;

			return formatDate.slice(0, 10);
		}

		return (
			<Container>
				<div className='d flex align-items-center justify-content-center'>
					<Form className='custom-form'>
						<h3 className='d-flex mb-3 text-align-center justify-content-center font-weight-bold register'>
							Update Your Account
						</h3>
						<Row>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label htmlFor='FirstName'>First Name</Form.Label>
									<Form.Control
										type='text'
										name='FirstName'
										placeholder='First Name'
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label htmlFor='LastName'>Last Name</Form.Label>
									<Form.Control
										type='text'
										name='LastName'
										placeholder='Last Name'
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
										placeholder='MM/DD/YY'
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label htmlFor='Username'>Username</Form.Label>
									<Form.Control
										type='text'
										name='Username'
										placeholder='Username'
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
										placeholder='Password'
									/>
									<Form.Text className='text-muted'>
										Your password requires a minimum of 8 characters.
									</Form.Text>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label htmlFor='Email'>Email</Form.Label>
									<Form.Control type='text' name='Email' placeholder='Email' />
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
								block
								onClick={() => {
									updateInfo(token);
								}}
							>
								Update
							</Button>
							<Link to='/'>
								<Button variant='danger' type='secondary link' size='md' block>
									Back To Movies
								</Button>
							</Link>
							<Button
								className='mt-3'
								variant='info'
								type='button'
								size='sm'
								block
								onClick={() => {
									deleteAccount(token);
									onSignOut(null);
									history.push('/');
								}}
							>
								Delete Account
							</Button>
						</div>
					</Form>
				</div>
			</Container>
		);
	}
}
