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

export class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			FirstName: '',
			LastName: '',
			Birthday: '',
			Username: '',
			Password: '',
			Email: '',
			FavoriteMovies: [],
			FirstNameError: '',
			LastNameError: '',
			BirthdayError: '',
			UsernameError: '',
			PasswordError: '',
			EmailError: '',
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		this.getUsers(accessToken);
	}

	getUsers(token) {
		axios
			.get('https://indiefix.herokuapp.com/users', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					users: response.data,
				});
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	removeFavoriteMovie(movie) {
		const token = localStorage.getItem('token');
		const url =
			'https://indiefix.herokuapp.com/users' +
			localStorage.getItem('user') +
			'/movies/' +
			movie._id;
		axios
			.delete(url, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response);
				this.componentDidMount();

				alert(`${movie.Title} has been removed from your Favorites List`);
			});
	}

	handleDelete() {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		axios
			.delete(`https://indiefix.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert(`${user} has been deleted`);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.location.pathname = '/';
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleUpdate(e) {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		console.log(this.state);
		let formIsValid = this.formValidation();

		if (formIsValid) {
			axios
				.put(
					`https://indiefix.herokuapp.com/users/${user}`,
					{
						FirstName: this.state.FirstName,
						LastName: this.state.LastName,
						Birthday: this.state.Birthday,
						Username: this.state.Username,
						Password: this.state.Password,
						Email: this.state.Email,
					},
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				.then((response) => {
					const data = response.data;
					localStorage.setItem('user', data.Username);
					console.log(data);
					alert(`${user} has been updated`);
					console.log(response);
				})
				.catch(function (error) {
					console.log(error.response.data);
				});
		}
	}

	formValidation() {
		let FirstNameError = {};
		let LastNameError = {};
		let BirthdayError = {};
		let UsernameError = {};
		let PasswordError = {};
		let EmailError = {};
		let isValid = true;

		// First Name validation
		if (this.state.FirstName.trim().length < 1) {
			FirstNameError.firstNameShort =
				'First Name must be alphanumeric and contain at least more then 1 character.';
			isValid = false;
		}
		// Last Name validation
		if (this.state.LastName.trim().length < 1) {
			LastNameError.lastNameShort =
				'Last Name must be alphanumeric and contain at least more then 1 character.';
			isValid = false;
		}
		// Birthday validation
		if (this.state.Birthday === '') {
			BirthdayError.birthdayEmpty = 'Please enter your birthdate.';
			isValid = false;
		}
		// Username validation
		if (this.state.Username.trim().length < 5) {
			UsernameError.usernameShort =
				'Username must be alphanumeric and contain at least 5 characters.';
			isValid = false;
		}
		// Password validation
		if (this.state.Password.trim().length < 8) {
			PasswordError.passwordMissing =
				'You must enter your current password or a new password (minimum of 8 characters).';
			isValid = false;
		}
		// Email validation
		if (
			!(
				this.state.Email &&
				this.state.Email.includes('.') &&
				this.state.Email.includes('@')
			)
		) {
			EmailError.notValidEmail = 'Please enter a valid email address.';
			isValid = false;
		}

		this.setState({
			FirstNameError: FirstNameError,
			LastNameError: LastNameError,
			BirthdayError: BirthdayError,
			UsernameError: UsernameError,
			PasswordError: PasswordError,
			EmailError: EmailError,
		});

		return isValid;
	}

	handleChange(e) {
		let { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	}

	render() {
		const { user, movies } = this.props;
		const {
			FirstNameError,
			LastNameError,
			BirthdayError,
			UsernameError,
			PasswordError,
			EmailError,
		} = this.state;
		const FavoriteMovieList = movies.filter((movie) => {
			return this.state.FavoriteMovies.includes(movie._id);
		});

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
}

ProfileView.propTypes = {
	movies: PropTypes.array.isRequired,
};
