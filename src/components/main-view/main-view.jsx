import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
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

	setSelectedMovie(newSelectedMovie) {
		this.setState({ selectedMovie: newSelectedMovie });
	}

	onLoggedIn(user) {
		this.setState({ user });
	}

	render() {
		const { movies, selectedMovie } = this.state;

		if (!user)
			return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		if (movies.length === 0) return <div className='main-view' />;

		return (
			<div className='main-view'>
				{selectedMovie ? (
					<MovieView
						movie={selectedMovie}
						onBackClick={(newSelectedMovie) => {
							this.setSelectedMovie(newSelectedMovie);
						}}
					/>
				) : (
					movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movie={movie}
							onMovieClick={(newSelectedMovie) => {
								this.setSelectedMovie(newSelectedMovie);
							}}
						/>
					))
				)}
			</div>
		);
	}
}

export default MainView;
