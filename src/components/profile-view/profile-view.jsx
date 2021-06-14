import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';

export class ProfileView extends React.Component {
	render() {
		let { user, token, history, UserData, onNewUser, onSignOut } = this.props;

		function updateInfo(token) {
			const userFirst = document.getElementById('firstName');
			const userLast = document.getElementById('lastName');
			const birthdayInput = document.getElementById('birthday');
			const userInput = document.getElementById('username');
			const passInput = document.getElementById('password');
			const passVerInput = document.getElementById('passwordVer');
			const emailInput = document.getElementById('email');

			if (userInput.value.length > 12) {
				const userErr = document.getElementById('user');
				return (userErr.innerText = 'Username can only 12 characters');
			}

			const nameChoice = userInput.value || UserData.Username;
			let passChoice = null;
			if (passInput.value == '') {
				passChoice = '';
			} else {
				passChoice = passInput.value;
			}
			const emailChoice = emailInput.value || UserData.Email;
			const birthdayChoice = birthdayInput.value || UserData.Birthday;

			if (passInput.value === passVerInput.value) {
				axios
					.put(
						`https://indiefix.herokuapp.com/users/${user}`,
						{
							Username: nameChoice,
							Password: passChoice,
							Email: emailChoice,
							Birthday: birthdayChoice,
						},
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then((response) => {
						console.log('Success with updating your account information');
						let userData2 = response.data;
						onNewUser(userData2);
						if (userInput.value != '') {
							window.location = `/users/${userData2.Username}`;
						}
						if (passChoice != '') {
							window.location = `/users/${userData2.Username}`;
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			} else {
				const passErr = document.getElementById('password');
				const passErrVer = document.getElementById('passwordVer');
				passErr.innerText = 'Your password must match';
				passErrVer.innerText = 'The passwords entered must match';
			}
		}

		function deleteAccount(token) {
			console.log('Your account is not deleted yet');
			axios
				.delete(`https://indiefix.herokuapp.com/users/${user}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response);
					console.log(`${user} has been deleted from the database`);
				})
				.catch((e) => {
					console.log('There was an error');
					console.log(e);
				});
		}

		function Date() {
			const formatDate = userData.Birthday;

			return formatDate.slice(0, 10);
		}

		if (userData.Username === 'ninja06') {
			return (
				<>
					<div className='ninProfile'>
						<h1 className='title my-4'>{`${userData.Username}`},</h1>
						<h2 className='title-2 my-4'>Your Current Information</h2>
						<div className='align-text-left'>
							<div className='my-2'>
								<strong>Username:</strong>
								{`${userData.Username}`}
							</div>
							<div className='my-2'>
								<strong>Email:</strong>
								{`${userData.Email}`}
							</div>
							<div className='my-2'>
								<strong>Birthday:</strong>
								{`${Date()}`}
							</div>
						</div>
						<h2 className='title-2 my-4'>Update Information</h2>
						<div>The ninja06 account info cannot be updated!</div>
					</div>
				</>
			);
		}

		return <></>;
	}
}
