import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
	render() {
		const { genre, onBackClick } = this.props;

		return (
			<div className='genre-view'>
				<Card border='info' className='genre-card my-5'>
					<Card.Body>
						<Card.Title>
							<span className='text-white font-weight-bold'>Name: </span>
							{genre.Name}
						</Card.Title>
						<Card.Text>
							<span className='text-white font-weight-bold'>Description: </span>
							{genre.Description}
						</Card.Text>
						<Button
							className='mt-2'
							block
							size='sm'
							variant='danger'
							onClick={() => {
								onBackClick();
							}}
						>
							Back To Movie Info
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
