import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// React Bootstrap Components
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

// Router
import { Link } from 'react-router-dom';

// Styles
import './profile-view.scss';

// Import movie poster
import ParaNorman from 'url:../images/paraNorman.jpg';

export function ProfileView({ user, token, deleteUser, updateUser, movies }) {
	const [newFirstName, updateFirstName] = useState('');
	const [newLastName, updateLastName] = useState('');
	const [newBirthday, updateBirthday] = useState('');
	const [newUsername, updateUsername] = useState('');
	const [newPassword, updatePassword] = useState('');
	const [newEmail, updateEmail] = useState('');

	// Validates states
	const [validateFirstName, setValidateFirstName] = useState('');
	const [validateLastName, setValidateLastName] = useState('');
	const [validateBirthday, setValidateBirthday] = useState('');
	const [validateUsername, setValidateUsername] = useState('');
	const [validatePassword, setValidatePassword] = useState('');
	const [validateEmail, setValidateEmail] = useState('');

	const {
		FirstName,
		LastName,
		Birthday,
		Username,
		Email,
		FavoriteMovieList,
	} = userProfile;

	// First Name validation
	const validateFirstName = (e) => {
		if (e.target.value.length < 2) {
			setValidateFirstName('First Name must contain more then 1 character');
		} else {
			setValidateFirstName('');
		}
	};

	// Last Name validation
	const validateLastName = (e) => {
		if (e.target.value.length < 2) {
			setValidateFirstName('Last Name must contain more then 1 character');
		} else {
			setValidateLastName('');
		}
	};

	// Birthday validation
	const validateBirthday = (e) => {
		if (e.target.value.length === '') {
			setValidateBirthday('Please enter your birthdate');
		} else {
			setValidateBirthday('');
		}
	};

	// Username validation
	const validateUsername = (e) => {
		if (e.target.value.length < 0 && e.target.value.length < 5) {
			setValidateFirstName('Username must contain more then 5 characters');
		} else {
			setValidateUsername('');
		}
	};

	// Password validation
	const validatePassword = (e) => {
		if (e.target.value.length < 0 && e.target.value.length < 8) {
			setValidatePassword('Password must be at least 8 characters');
		} else {
			setValidatePassword('');
		}
	};

	// Password validation
	const validateEmail = (e) => {
		if (!e.target.value.match(/\S+@\S+\.\S+/) && e.target.value.length > 0) {
			setValidateEmail('Please enter a valid email address');
		} else {
			setValidateEmail('');
		}
	};

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
									value={this.state.FirstName}
									onChange={(e) => this.handleChange(e)}
									placeholder='First Name'
								/>
								{Object.keys(FirstNameError).map((key) => {
									return (
										<div key={key} style={{ color: '#e50000' }}>
											{FirstNameError[key]}
										</div>
									);
								})}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='LastName'>Last Name</Form.Label>
								<Form.Control
									type='text'
									name='LastName'
									value={this.state.LastName}
									onChange={(e) => this.handleChange(e)}
									placeholder='Last Name'
								/>
								{Object.keys(LastNameError).map((key) => {
									return (
										<div key={key} style={{ color: '#e50000' }}>
											{LastNameError[key]}
										</div>
									);
								})}
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
									value={this.state.Birthday}
									onChange={(e) => this.handleChange(e)}
									placeholder='MM/DD/YY'
								/>
								{Object.keys(BirthdayError).map((key) => {
									return (
										<div key={key} style={{ color: '#e50000' }}>
											{BirthdayError[key]}
										</div>
									);
								})}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='Username'>Username</Form.Label>
								<Form.Control
									type='text'
									name='Username'
									value={this.state.Username}
									onChange={(e) => this.handleChange(e)}
									placeholder='Username'
								/>
								{Object.keys(UsernameError).map((key) => {
									return (
										<div key={key} style={{ color: '#e50000' }}>
											{UsernameError[key]}
										</div>
									);
								})}
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
									value={this.state.Password}
									onChange={(e) => this.handleChange(e)}
									placeholder='Password'
								/>
								{Object.keys(PasswordError).map((key) => {
									return (
										<div key={key} style={{ color: '#e50000' }}>
											{PasswordError[key]}
										</div>
									);
								})}
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
									value={this.state.Email}
									onChange={(e) => this.handleChange(e)}
									placeholder='Email'
								/>
								{Object.keys(EmailError).map((key) => {
									return (
										<div key={key} style={{ color: '#e50000' }}>
											{EmailError[key]}
										</div>
									);
								})}
								<Form.Text className='text-muted'>
									Your email must be a valid email address.
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>
					<div style={{ float: 'center', textAlign: 'center' }}>
						<Card.Text className='mt-3 font-weight-bold' as='h5'>
							Favorite Movies:
						</Card.Text>
						<Row>
							{FavoriteMovieList.map((movie) => {
								return (
									<Col md={3} key={movie._id}>
										<div key={movie._id}>
											<Card>
												<Card.Img variant='top' src={ParaNorman} />
												<Card.Body>
													<Link to={`/movies/${movie._id}`}>
														<Card.Title as='h6'>{movie.Title}</Card.Title>
													</Link>
													<Button
														onClick={() => this.removeFavoriteMovie(movie)}
													>
														Remove Movie
													</Button>
												</Card.Body>
											</Card>
										</div>
									</Col>
								);
							})}
						</Row>
					</div>
					<div className='d-grid gap-2 custom-button'>
						<Button
							className='mb-3'
							variant='info primary'
							type='submit'
							expand='lg'
							block
							onClick={(e) => this.handleUpdate(e)}
						>
							Update
						</Button>
						<Button
							className='mt-3'
							variant='danger'
							type='button'
							size='sm'
							block
							onClick={() => this.handleDelete()}
						>
							Delete Account
						</Button>
					</div>
				</Form>
			</div>
		</Container>
	);
}

ProfileView.propTypes = {
	movies: PropTypes.array.isRequired,
};
