import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventContextProvider } from './store/event-context';
import { SubEventContextProvider } from './store/sub-event-context';

ReactDOM.render(
	<React.StrictMode>
		<EventContextProvider>
			<SubEventContextProvider>
				<App />
			</SubEventContextProvider>
		</EventContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
