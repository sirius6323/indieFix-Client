import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to bundle './index.scss'
import './index.scss';

// Main component (will eventually use all others)
class MyIndieFixApplication extends React.Component {
	render() {
		return (
			<div className='my-indie'>
				<div>Greetings from IndieFix!!!</div>
			</div>
		);
	}
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// React renders my app in the root DOM element
ReactDOM.render(React.createElement(MyIndieFixApplication), container);
