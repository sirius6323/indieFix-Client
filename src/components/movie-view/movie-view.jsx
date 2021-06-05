import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './movie-view.scss';
import ParaNorman from 'url:../images/paraNorman.jpg';

// Component to display single movie view
export class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className='movie-view'>
				<Card border='info' className='movie-card my-5'>
					<Card.Img variant='top' src={ParaNorman} />
					<Card.Body>
						<Card.Title>
							<span className='text-white font-weight-bold'>Title: </span>
							{movie.Title}
						</Card.Title>
						<Card.Text>
							<span className='text-white font-weight-bold'>Description: </span>
							{movie.Description}
						</Card.Text>
						<Card.Text>
							<span className='text-white font-weight-bold'>Genre: </span>
							{movie.Genre.Name}
						</Card.Text>
						<Card.Text>
							<span className='text-white font-weight-bold'>Director: </span>
							{movie.Director.Name}
						</Card.Text>
						<Row>
							<Col>
								<Button
									className='mb-2'
									size='sm'
									block
									variant='danger'
									// onClick={() => {
									// 	onDirectorClick(director);
									// }}
								>
									Director
								</Button>
							</Col>
							<Col>
								<Button className='mb-2' size='sm' block variant='danger'>
									Genre
								</Button>
							</Col>
							<Col>
								<Button
									size='sm'
									variant='danger'
									className='mb-2'
									block
									onClick={() => {
										onBackClick(null);
									}}
								>
									Movies
								</Button>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

MovieView.propTypes = {
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
	}).isRequired,
};
