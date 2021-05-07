import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import statement to bundle './index.scss'
import './index.scss';

// Main component (will eventually use all others)
class MyIndieFixApplication extends React.Component {
	render() {
		return <MainView />;
	}
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// React renders my app in the root DOM element
ReactDOM.render(React.createElement(MyIndieFixApplication), container);
