import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
	render() {
		const { director, onBackClick } = this.props;

		return (
			<div className='director-view'>
				<Card border='info' className='director-card my-5'>
					<Card.Body>
						<Card.Title>
							<span className='text-white font-weight-bold'>Name: </span>
							{director.Name}
						</Card.Title>
						<Card.Text>
							<span className='text-white font-weight-bold'>Bio: </span>
							{director.Bio}
						</Card.Text>
						<Card.Text>
							<span className='text-white font-weight-bold'>Birth: </span>
							{director.Birth}
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

DirectorView.propTypes = {
	director: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Bio: PropTypes.string.isRequired,
		Birth: PropTypes.string.isRequired,
	}),
	onBackClick: PropTypes.func.isRequired,
};
