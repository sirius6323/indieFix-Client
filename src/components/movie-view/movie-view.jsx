import React from 'react';

// Component to display single movie view
export class MovieView extends React.Component {
	render() {
		const { movieData } = this.props;

		return (
			<div className='movie-view'>
				<div className='movie-poster'>
					<img src={movieData.ImageURL} />
				</div>
				<div className='movie-title'>
					<span className='label'>Title:</span>
					<span className='value'>{movieData.Title}</span>
				</div>
				<div className='movie-description'>
					<span className='label'>Description:</span>
					<span className='value'>{movieData.Description}</span>
				</div>
			</div>
		);
	}
}
