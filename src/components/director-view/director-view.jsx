import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';

export class DirectorView extends React.Component {
	render() {
		const { director, onBackClick } = this.props;

		return (
			<div className='director-view'>
				<Card border='info' className='director-card'>
					<Card.Body>
						<Card.Title>
							<span className='text-white font-weight-bold'>Name: </span>
						</Card.Title>{' '}
						{director.Name}
						<Card.Text>
							<span className='text-white font-weight-bold'>Bio: </span>
						</Card.Text>{' '}
						{director.Bio}
						<Card.Text>
							<span className='text-white font-weight-bold'>Birth: </span>
						</Card.Text>{' '}
						{director.Birth}
						<Button
							block
							size='sm'
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

DirectorView.propTypes = {
	director: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Bio: PropTypes.string.isRequired,
		Birth: PropTypes.string.isRequired,
	}),
	onBackClick: PropTypes.func.isRequired,
};
