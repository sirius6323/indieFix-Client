// Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap Components
import { Navbar, Nav } from 'react-bootstrap';

// Styles sheet
import './navbar.scss';

export class NavBar extends React.Component {
	render() {
		const { onLoggedOut, history, user, movie } = this.props;

		return (
			<>
				<Navbar
					className='font-weight-bold'
					fixed='top'
					expand='sm'
					bg='info'
					variant='dark'
				>
					<Navbar.Brand href='/'>indieFix</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse>
						<Nav className='mr-auto'>
							<Nav.Link href='/movies/movieId' className='text-white mx-2'>
								All Movies
							</Nav.Link>
							<Nav.Link href='/profile' className='text-white mx-2'>
								Profile
							</Nav.Link>

							<Nav.Link
								className='text-white mx-2'
								onClick={() => {
									onLoggedOut();
								}}
							>
								Log Out
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</>
		);
	}
}

NavBar.propTypes = {
	onLoggedOut: PropTypes.func.isRequired,
};
