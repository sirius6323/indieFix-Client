import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
	render() {
		const { genre, onBackClick } = this.props;

		return (
			<div className='genre-view'>
				<Card border='info' className='genre-card'>
					<Card.Body>
						<Card.Title>
							<span className='text-white font-weight-bold'>Name: </span>
						</Card.Title>
						<Card.Text>
							<span className='text-white font-weight-bold'> Bio: </span>
						</Card.Text>
						<Card.Text>
							<span className='text-white font-weight-bold'> Birth: </span>
						</Card.Text>
						<Button
							onBackClick={() => {
								onBackClick();
							}}
						>
							Movie Info
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

GenreView.propTypes = {
	genre: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
	}),
	onBackClick: PropTypes.func.isRequired,
};
