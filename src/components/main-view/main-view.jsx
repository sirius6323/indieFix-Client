import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Row, Col, Navbar } from 'react-bootstrap';

class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			user: null,
		};
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

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
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

	render() {
		const { movies, user } = this.state;

		if (!user)
			return (
				<Row>
					<Col>
						<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
					</Col>
				</Row>
			);

		if (movies.length === 0) return <div className='main-view' />;

		return (
			<Router>
				<Row className='main view justify-content-md-center'>
					<Route
						exact
						path='/'
						render={() => {
							return movies.map((m) => (
								<Col md={3} key={m._id}>
									<MovieCard movie={m} />
								</Col>
							));
						}}
					/>
					<Route
						exact
						path='/movies/:movieId'
						render={({ match }) => {
							return (
								<Col md={8}>
									<MovieView
										movie={movies.find((m) => m.id === match.params.movieID)}
									/>
								</Col>
							);
						}}
					/>
					<Route
						exact
						path='/genres/:name'
						render={({ match }) => {
							if (movies.length === 0) return <div className='main-view' />;

							return (
								<Col md={8}>
									<GenreView
										genre={
											movies.find((m) => m.Genre.Name === match.params.name)
												.Genre
										}
									/>
								</Col>
							);
						}}
					/>
					<Route
						exact
						path='/directors/:name'
						render={({ match }) => {
							if (movies.length === 0) return <div className='main-view' />;

							return (
								<Col md={8}>
									<DirectorView
										director={
											movies.find((m) => m.Director.Name === match.params.name)
												.Director
										}
									/>
								</Col>
							);
						}}
					/>
				</Row>
			</Router>
		);
	}
}

export default MainView;
