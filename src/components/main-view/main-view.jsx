import React from 'react';
import axios from 'axios';

// Router
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Components
import { NavBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

// React Bootstrap
import { Row, Col } from 'react-bootstrap';

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

	// Fetches all movies from DB
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

	getUsers(token) {
		axios
			.get('https://indiefix.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assigns the the state
				this.setState({
					users: response.data,
				});
				console.log(response);
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

	// Logout function that clears local storage
	onLoggedOut() {
		localStorage.clear();
		this.setState({
			user: null,
		});
	}

	// Update user account
	updateUser(data) {
		this.setState({
			user: data.Username,
		});
	}

	// Deletes user account
	deleteUser() {
		localStorage.removeItem('token');
		localStorage.removeIem('user');
		this.setState({
			user: null,
			token: null,
		});
	}

	onRegister(register) {
		console.log(register);
		this.setState({
			register,
		});
	}

	// toggleRegister = (e) => {
	// 	e.preventDefault();
	// 	this.setState({ register: !this.state.register });
	// };

	render() {
		const { movies, user, token, history } = this.state;

		return (
			<Router>
				<Row className='main view justify-content-md-center'>
					{/* Home */}
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
					{/* Registration View */}
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
					{/* Movie View */}
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
					{/* Genre View */}
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
					{/* Director View */}
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
					{/* Profile View */}
					<Route
						exact
						path='/users/:userId'
						render={({ history }) => {
							return (
								<Col>
									<NavBar />
									<ProfileView
										onBackClick={() => history.goBack()}
										movies={movies}
										user={user}
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
