import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Row, Col, Navbar } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
		};
	}

	// Fetch Movies from server
	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	setSelectedMovie(movie) {
		this.setState({ selectedMovie: movie });
	}

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	}

	getMovies(token) {
		axios
			.get('https://indiefix.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assigns the result to the state
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onRegister(register) {
		this.setState({ register });
	}

	onBackClick() {
		this.setState({ selectedMovie: null });
	}

	toggleRegister = (e) => {
		e.preventDefault();
		this.setState({ register: !this.state.register });
	};

	render() {
		const { movies, selectedMovie, register } = this.state;

		if (register)
			return (
				<RegistrationView
					onRegister={(register) => this.onRegister(register)}
					toggleRegister={this.toggleRegister}
				/>
			);

		if (this.state.user === null)
			return (
				<LoginView
					onLoggedIn={(user) => this.onLoggedIn(user)}
					toggleRegister={this.toggleRegister}
				/>
			);

		if (movies.length === 0) return <div className='main-view' />;

		return (
			<div className='main-view justify-content-md-center'>
				<Navbar
					bg='info'
					expand='lg'
					sticky='top'
					variant='dark'
					className='navbar mb-3'
				>
					<Navbar.Brand href='http://localhost:1234' className='navbar-brand'>
						indieFix
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse
						className='justify-content-end'
						id='basic-navbar-nav'
					></Navbar.Collapse>
				</Navbar>
				<Row className='main-view justify-content-md-center'>
					{selectedMovie ? (
						<Col md={6}>
							<MovieView
								movie={selectedMovie}
								onBackClick={(newSelectedMovie) => {
									this.setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					) : (
						movies.map((movie) => (
							<Col sm={6} md={4} lg={3} key={movie._id}>
								{
									<MovieCard
										movie={movie}
										onMovieClick={(newSelectedMovie) => {
											this.setSelectedMovie(newSelectedMovie);
										}}
									/>
								}
							</Col>
						))
					)}
				</Row>
			</div>
		);
	}
}

export default MainView;
