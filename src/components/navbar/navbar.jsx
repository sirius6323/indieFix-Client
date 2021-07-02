// Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap Components
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Styles sheet
import './navbar.scss';

export class NavBar extends React.Component {
	render() {
		const { logOut, user } = this.props;

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
					<Navbar.Collapse bg='info' className='justify-content-end'>
						<Nav className='d-flex navbar-bg'>
							<Link
								to='/profile'
								className='text-white mx-4 my-2'
								style={{ textDecoration: 'none' }}
							>
								Profile
							</Link>
							<Link
								to='/'
								className='text-white mx-4 my-2'
								style={{ textDecoration: 'none' }}
								onClick={logOut}
							>
								Log Out
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</>
		);
	}
}

NavBar.propTypes = {
	logOut: PropTypes.func,
};
