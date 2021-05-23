import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [
				{
					_id: 1,
					Title: 'Get Out',
					Description: `Get Out plot follows Chris Washington. He is a young African American man who uncovers dark and disturbing secrets as he meets his white girlfriend Rose Armitage. Chris and his girlfriend Rose have reached the milestone in their dating when the couple meets each other's parents.`,
					ImageURL:
						'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_UX182_CR0,0,182,268_AL_.jpg',
					Genre: 'Horror',
					Director: 'Jordan Peele',
				},
				{
					_id: 2,
					Title: 'The Life Aquatic with Steve Zissou',
					Description: `Renowned oceanographer Steve Zissou (Bill Murray) has sworn vengeance upon the rare shark that devoured a member of his crew. In addition to his regular team, he is joined on his boat by Ned (Owen Wilson), a man who believes Zissou to be his father, and Jane (Cate Blanchett), a journalist pregnant by a married man. They travel the sea, all too often running into pirates and, perhaps more traumatically, various figures from Zissou's past, including his estranged wife, Eleanor (Anjelica Huston).`,
					ImageURL:
						'https://resizing.flixster.com/jnAF2I9c6BYweORpmNBcxMAuo9c=/206x305/v2/https://flxt.tmsimg.com/NowShowing/39131/39131_aa.jpg',
					Genre: 'Comedy',
					Director: 'Wes Anderson',
				},
				{
					_id: 3,
					Title: 'The Isle of Dogs',
					Description: `When, by executive decree, all the canine pets of Megasaki City are exiled to a vast garbage-dump called Trash Island, 12-year-old Atari sets off alone in a miniature Junior-Turbo Prop and flies across the river in search of his bodyguard-dog, Spots. There, with the assistance of a pack of newly-found mongrel friends, he begins an epic journey that will decide the fate and future of the entire Prefecture.`,
					ImageURL:
						'https://resizing.flixster.com/7t0sWUFGF1AK7cWGbh97dg7VcWQ=/206x305/v2/https://resizing.flixster.com/WzXh9s5LIUPuEuABVAqZ3VohKZE=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2E1ZjdlMzNkLTA0MTctNGNmNy1iMjljLThkZGU1NzA2NmUyYy53ZWJw',
					Genre: 'Animated',
					Director: 'Wes Anderson',
				},
			],
			selectedMovie: null,
		};
	}

	setSelectedMovie(newSelectedMovie) {
		this.setState({ selectedMovie: newSelectedMovie });
	}

	render() {
		const { movies, selectedMovie } = this.state;

		if (movies.length === 0)
			return (
				<div className='main-view'>
					Please check back soon. Movies will be added.
				</div>
			);

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
							onMovieClick={(movie) => {
								this.setSelectedMovie(movie);
							}}
						/>
					))
				)}
			</div>
		);
	}
}

export default MainView;
