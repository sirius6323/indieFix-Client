import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
		axios
			.get('https://indiefix.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	setSelectedMovie(movie) {
		this.setState({ selectedMovie: movie });
	}

	onLoggedIn(user) {
		this.setState({ user });
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
					className='navbar shadow mb-5'
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
						<Col md={8}>
							<MovieView
								movie={selectedMovie}
								onBackClick={(newSelectedMovie) => {
									this.setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					) : (
						movies.map((movie) => (
							<Col md={3}>
								{
									<MovieCard
										key={movie._id}
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
