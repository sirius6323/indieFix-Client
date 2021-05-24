import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(firstName, lastName, birthday, username, email);
		props.onRegister(username);
	};

	return (
		<form className='register-form'>
			<label className='register-input'>
				First Name:
				<input
					type='text'
					value={firstName}
					onChange={e.setFirstName(e.target.value)}
				/>
			</label>
			<label className='register-input'>
				Last Name:
				<input
					type='text'
					value={lastName}
					onChange={e.setLastName(e.target.value)}
				/>
			</label>
			<label className='register-input'>
				Birthday:
				<input
					type='text'
					value={birthday}
					onChange={e.setBirthday(e.target.value)}
				/>
			</label>
			<label className='register-input'>
				Username:
				<input
					type='text'
					value={username}
					onChange={e.setUsername(e.target.value)}
				/>
			</label>
			<label className='register-input'>
				Password:
				<input
					type='text'
					value={password}
					onChange={e.setPassword(e.target.value)}
				/>
			</label>
			<label className='register-input'>
				Email:
				<input
					type='text'
					value={email}
					onChange={e.setEmail(e.target.value)}
				/>
			</label>
			<span>
				<button type='button' onClick={handleSubmit}>
					Submit
				</button>
				<button
					onClick={() => {
						onBackClick(null);
					}}
				>
					Back
				</button>
			</span>
		</form>
	);
}

RegistrationView.PropTypes = {
	onRegister: PropTypes.func.isRequired,
};
