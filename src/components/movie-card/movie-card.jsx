import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck } from 'react-bootstrap';
import './movie-card.scss';
import ParaNorman from 'url:../images/paraNorman.jpg';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<CardDeck className='py-5'>
				<Card
					className='d-flex justify-content-center align-items-center'
					border='info'
				>
					<Card.Img className='movie-poster' variant='top' src={ParaNorman} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description.slice(0, 70)} ...'</Card.Text>
						<Link to={`/movies/${movie._id}`}>
							<Button variant='danger link' size='sm' block>
								Movie Info
							</Button>
						</Link>
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
};
