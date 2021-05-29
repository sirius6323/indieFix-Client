import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck } from 'react-bootstrap';

export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;

		return (
			<CardDeck>
				<Card className='mb-2' border='info' style={{ width: '18rem' }}>
					<Card.Img variant='top' src={movie.ImageURL / '100px160'} />
					<Card.Body>
						<Card.Title className='text-center'>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description}</Card.Text>
						<Button
							onClick={() => onMovieClick(movie)}
							variant='danger link'
							size='md'
							block
						>
							Open
						</Button>
					</Card.Body>
				</Card>
			</CardDeck>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired,
		}),
		ImageURL: PropTypes.string.isRequired,
		Featured: PropTypes.bool.isRequired,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
