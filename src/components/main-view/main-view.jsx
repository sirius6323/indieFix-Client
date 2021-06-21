import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { NavBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col, Button } from 'react-bootstrap';

class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			user: null,
		};
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

	/* When a user successfully logs in, this function updates 
	   the 'user' property in state to that 'particular user' */

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	toggleRegister = (e) => {
		e.preventDefault();
		this.setState({ register: !this.state.register });
	};

	render() {
		const { movies, user } = this.state;

		return (
			<Router>
				<Row className='main view justify-content-md-center'>
					<Route
						exact
						path='/'
						render={() => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className='main-view' />;
							return movies.map((m) => (
								<Col sm={6} md={4} lg={3} key={m._id}>
									<NavBar />
									<MovieCard movie={m} />
								</Col>
							));
						}}
					/>
					<Route
						path='/register'
						render={() => {
							if (user) return <Redirect to='/' />;
							return (
								<Col>
									<RegistrationView />
								</Col>
							);
						}}
					/>
					<Route
						exact
						path='/movies/:movieId'
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className='main-view' />;
							return (
								<Col md={8}>
									<NavBar />
									<MovieView
										movie={movies.find((m) => m._id === match.params.movieId)}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>
					<Route
						exact
						path='/genres/:name'
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);

							if (movies.length === 0) return <div className='main-view' />;
							return (
								<Col md={8}>
									<NavBar />
									<GenreView
										genre={
											movies.find((m) => m.Genre.Name === match.params.name)
												.Genre
										}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>
					<Route
						exact
						path='/directors/:name'
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);

							if (movies.length === 0) return <div className='main-view' />;
							return (
								<Col md={8}>
									<NavBar />
									<DirectorView
										director={
											movies.find((m) => m.Director.Name === match.params.name)
												.Director
										}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>
					<Route
						exact
						path='/profile'
						render={({ history }) => {
							return (
								<Col>
									<NavBar />
									<ProfileView onBackClick={() => history.goBack()} />
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
